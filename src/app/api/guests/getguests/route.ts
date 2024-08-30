import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { guestId } = await req.json();
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const guest = await prisma.guests.findFirst({
            where: {
                id: guestId
            }
        })

        if (!guest) {
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