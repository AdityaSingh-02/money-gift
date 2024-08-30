import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "User not found"
                }
            })
        }
        return NextResponse.json({
            status: 200,
            body: {
                message: "User found",
                data: user
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Internal Server Error"
            }
        })
    }

}