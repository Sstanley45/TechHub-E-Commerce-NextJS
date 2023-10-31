import prisma from "@/libs/prismadb";
import bcryptjs from 'bcryptjs';

import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json()
    const { name, email, password } = body;

    //hash password
    const hashedPassword = await bcryptjs.hash(password, 10)

    //create user with prisma
    const user = await prisma.user.create({
        data: {
            name,email,hashedPassword
        }
    })

    return NextResponse.json(user);
}