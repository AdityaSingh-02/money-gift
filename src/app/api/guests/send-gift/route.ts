import PrismaInstanceSingleton from "@/db";
import { transation } from "@/lib/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { adminId, guestId, amount } = await req.json();
    try {
        const sender = await transation(adminId, guestId, parseInt(amount));
        return NextResponse.json({
            status: 200,
            body: {
                message: "Gift sent",
                data: sender
            }
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Internal Server Error"
            }
        })
    }
}