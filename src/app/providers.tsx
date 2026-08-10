"use client";

import React from "react";

import { ThemeProvider } from "@/providers/theme-provider";
import QueryProvider from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";

import { Toaster } from "sonner";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({
    children,
}: ProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryProvider>
                <AuthProvider>
                    {children}

                    <Toaster
                        position="top-right"
                        richColors
                    />
                </AuthProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}