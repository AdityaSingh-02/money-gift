import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const deletecookie = cookies().delete("token");
    return NextResponse.json({
        status: 200,
        message: "User logged out successfully!",
    });
}
