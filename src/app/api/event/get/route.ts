import PrismaInstanceSingleton from "@/db";
import { useAppSelector } from "@/store/hooks";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const params = await req.json();
    const { id } = params;
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const events = await prisma.events.findMany({
            where: {
                userId: id
            }
        });
        return NextResponse.json({
            status: 200,
            data: {
                message: "Events fetched successfully",
                events
            }
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            data: {
                message: "Error while fetching events"
            }
        });
    }
}