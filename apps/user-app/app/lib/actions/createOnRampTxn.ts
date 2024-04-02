"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTxn(amount : number, provider : string){
    const session = await getServerSession(authOptions);
    //token is returned by the bank server which is given to the user so that the bank knows which user is being dealt with
    const token = Math.random().toString();
    const userId = session?.user?.id;
    if(!userId){
        return {
            message :"user not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            userId : Number(userId),
            amount ,
            status : "Processing",
            startTime : new Date(),
            provider,
            token,

        }
    })
    return {
        message : "on ramped successfully"
    }
}