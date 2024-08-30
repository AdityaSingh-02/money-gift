import { transactionFromAdmin } from "@/lib/transactionFromAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { amount, adminId, to } = await req.json();
    try {
        const res = await transactionFromAdmin(adminId, to, parseInt(amount));
        return NextResponse.json({
            status: res.status,
            body: {
                message: res.body.message,
                data: res.body
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