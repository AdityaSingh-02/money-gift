import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    const { eventId } = await req.json();
    try {
        const event = await prisma.events.findFirst({
            where: {
                id: eventId
            }
        });

        if (!event) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "Event not found"
                }
            })
        }

        return NextResponse.json({
            status: 200,
            body: {
                message: "Event found",
                data: event
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