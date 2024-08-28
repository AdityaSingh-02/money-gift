"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { clientCookie } from "@/utils/clientCookie";
import { useAppSelector } from "@/store/hooks";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("gift-app-token");
        if (token === null) {
            router.push("/");
        }
    })
    return <>{children}</>;
}
