import { sessionChatTable } from '@/config/schema';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { currentUser } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm'; // Add this import


export async function POST(req: NextRequest) {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();
    try{
        const sessionId = uuidv4();
        
        const result = await db.insert(sessionChatTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdOn: (new Date()).toString(),
            //@ts-ignore
        }).returning({sessionChatTable});

        return NextResponse.json(result[0].sessionChatTable);
    }catch(e){
        return NextResponse.json(e)
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
        }

        const sessionChat = await db.select().from(sessionChatTable)
            .where(eq(sessionChatTable.sessionId, sessionId));

        if (sessionChat.length === 0) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: sessionChat[0]
        });

    } catch (error) {
        console.error("Error fetching session:", error);
        return NextResponse.json({ 
            error: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}