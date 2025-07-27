import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { Session } from "inspector/promises";

export async function  POST(req:NextRequest){
    const user = await currentUser();

    try{
        const users = await db.select().from(usersTable)
            //@ts-ignore
            .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress))
            if(users?.length == 0){
                const result = await db.insert(usersTable).values({
                    // @ts-ignore
                    name:user?.fullName,
                    email:user?.primaryEmailAddress?.emailAddress,
                    credits:100
                    //@ts-ignore
                }).returning({usersTable})
                return NextResponse.json(result[0]?.usersTable);
            }

            return NextResponse.json(users[0]);
    }
    catch (e){
        return NextResponse.json(e)
    }
}

