import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { eventId } = await req.json();
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const guests = await prisma.guests.findMany({
            where: {
                eventId
            }
        })

        if (!guests) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "Guests not found"
                }
            })
        }
        return NextResponse.json({
            status: 200,
            body: {
                message: "Guests found",
                data: guests
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