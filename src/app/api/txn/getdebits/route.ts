import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const data = await prisma.giftSent.findMany({
            where: {
                userId: id
            }
        });
        if (!data) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "No data found"
                }
            })
        }

        return NextResponse.json({
            status: 200,
            body: {
                message: "Data found",
                data
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "An error occured"
            }
        })
    }
}