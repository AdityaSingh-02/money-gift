"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("gift-app-token");
        if (token !== null) {
            const path = pathName.split("/")[1];
            path !== 'dashboard' && router.push("/dashboard");
        }
    }, [])

    return <>
        <Provider store={store}>
            {children}
        </Provider>
    </>;
}
