"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("gift-app-token");
        if (token !== null) {
            router.push("/dashboard");
        }
    })

    return <>
        <Provider store={store}>
            {children}
        </Provider>
    </>;
}
