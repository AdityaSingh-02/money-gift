"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelectedLayoutSegment } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/store/store";
export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const segment = useSelectedLayoutSegment();
    // const Router = useRouter();
    // const check = async () => {
    //     if (segment === "(protected)") {
    //         return;
    //     }
    // };
    // useEffect(() => {
    //     check();
    // }, []);

    return <>
        <Provider store={store}>
            {children}
        </Provider>
    </>;
}
