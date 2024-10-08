import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import PrismaInstanceSingleton from "@/db";
import bcrypt from 'bcrypt'
import { JWT_SECRET } from "@/lib/config";

export async function POST(req: Request, res: NextResponse) {
    const data = await req.json();
    const { email, password } = data;
    const prisma = PrismaInstanceSingleton.getPrismaInstance();
    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (checkUser) {
            const checkPassword = await bcrypt.compare(password, checkUser.password);
            if (!checkPassword) {
                return NextResponse.json({
                    status: 500,
                    body: {
                        message: "Invalid Credentials"
                    }
                });
            }
            const token = jwt.sign(
                {
                    id: checkUser.id,
                    email: checkUser.email,
                    name: checkUser.name,
                    mobile: checkUser.mobile,
                    city: checkUser.city,
                },
                JWT_SECRET
            );
            return NextResponse.json({
                status: 200,
                body: {
                    message: "User Logged in successfully",
                    data: token
                }
            });
        }
        return NextResponse.json({
            status: 403,
            body: {
                message: "Error While logging in"
            }
        });
    } catch (error) {
        return NextResponse.json({
            status: 402,
            message: "No user found with these credentials",
        });
    }
}
