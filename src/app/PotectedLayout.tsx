"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import getCookies from "@/utils/getCookie";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();

    getCookies().then(res => {
        if(res){ 
            router.push("/dashboard");
        }
    })
    return <>
        <Provider store={store}>
            {children}
        </Provider>
    </>;
}
