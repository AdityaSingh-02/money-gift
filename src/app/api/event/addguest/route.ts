import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { eventId, guestEmail, guestMobile, guestName } = await req.json();
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const guest = await prisma.guests.create({
            data: {
                guestEmail,
                guestMobile,
                guestName,
                eventId
            }
        });

        if (!guest) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "Guest not added"
                }
            })
        }
        return NextResponse.json({
            status: 200,
            body: {
                message: "Guest added",
                data: guest
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