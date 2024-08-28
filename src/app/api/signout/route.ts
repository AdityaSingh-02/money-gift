import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    localStorage.removeItem("gift-app-token");
    return NextResponse.json({
        status: 200,
        message: "User logged out successfully!",
    });
}
