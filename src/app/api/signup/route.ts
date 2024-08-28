import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { signUpUserSchema } from "@/utils/schema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@/lib/config";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const body = await req.json();
    // Add backend validations
    // const validateUser = signUpUserSchema.safeParse(body);

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name,
                mobile: body.mobile,
                city: body.city,
            }
        });
        if (user) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    mobile: user.mobile,
                    city: user.city,
                },
                JWT_SECRET
            );
            return NextResponse.json({
                status: 200,
                body: {
                    message: "User created successfully",
                    data: token
                }
            });
        }
        return NextResponse.json({
            status: 403,
            body: {
                message: "Unable to create user"
            }
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            body: {
                error: "Internal Server Error"
            }
        })
    }
}