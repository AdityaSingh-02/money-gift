"use client"
import jwt from "jsonwebtoken"

export async function getClientData(token: string) {
    const dec = jwt.decode(token);
    return {data: dec};
}