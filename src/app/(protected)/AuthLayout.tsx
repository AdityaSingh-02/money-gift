"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import getCookies from "@/utils/getCookie";
import { setUser } from "@/store/slices/user";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    getCookies().then(res => {
        if(res)dispatch(setUser(res));
        else router.push("/createuser");
    });

    return <>{children}</>;
}
