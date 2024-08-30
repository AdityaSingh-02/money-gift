import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const eventData = await prisma.events.findUnique({
            where: {
                id
            }
        });
        if (!eventData) {
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
                data: eventData
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 403,
            body: {
                message: "Error while fetching"
            }
        })
    }
}