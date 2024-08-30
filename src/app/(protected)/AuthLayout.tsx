"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { clientCookie } from "@/utils/clientCookie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getClientData } from "@/utils/getClientData";
import { USERID } from "@/cache/constants";
import { setUser } from "@/store/slices/user";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const resolve = async () => {
            const token = localStorage.getItem("gift-app-token");
            if (token === null) {
                router.push("/");
            }
            const res = await getClientData(token!);
            // @ts-ignore
            USERID.set(res.data.id);
            dispatch(setUser(res.data));
        }
        resolve();
    })
    return <>{children}</>;
}
