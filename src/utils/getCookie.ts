"use server";

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export default async function getCookies() {
    const cookieStore = cookies()
    const user = await cookieStore.get('token');
    if (user) {
        const res = await jwt.decode(user?.value);
        return Promise.resolve(res);
    }
    return null;
} 