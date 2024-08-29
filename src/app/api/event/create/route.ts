import PrismaInstanceSingleton from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const params = await req.json();
    const { eventName, date, eventVenue, userId } = params;
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const event = await prisma.events.create({
            data: {
                userId,
                eventDate: new Date(date),
                eventName,
                eventVenue,
                isUpcomming: true
            }
        });

        if (event) {
            return NextResponse.json({
                status: 200,
                body: {
                    message: "Event created successfully",
                    data: event
                }
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Error while creating event",
            }
        })
    }
}