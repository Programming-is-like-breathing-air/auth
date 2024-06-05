import { NextResponse } from "next/server";
import { db } from "@/lib/db"
import { use } from "react";
import { hash } from "bcrypt";
import * as z from 'zod';

// Define a schema for input validataion
const userSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters.'),
    })

// export async function GET() {

//     return NextResponse.json({ success: true })
// }


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        // Check is the email existed
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email is already existed" }, { status: 409 })
        }

        // Check is username existed
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username is already existed" }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        const { password: newUserPassword, ...rest } = newUser;



        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Something when wrong" }, { status: 500 });

    }

}