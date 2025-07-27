import { sessionChatTable } from '@/config/schema';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { currentUser } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';


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