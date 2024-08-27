import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { signUpUserSchema } from "@/utils/schema";

export async function POST(req: NextRequest) {
    const body = await req.json();
    // Add backend validations
    // const validateUser = signUpUserSchema.safeParse(body);
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name,
                mobile: body.mobile,
                city: body.city,
            }
        });
        if (user) {
            return NextResponse.json({
                status: 200,
                body: {
                    message: "User created successfully"
                }
            })
        }
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