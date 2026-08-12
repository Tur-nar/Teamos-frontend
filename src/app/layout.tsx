import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "TM-Management",
    description: "Enterprise-grade multi-tenant team management platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${poppins.variable} h-full antialiased`}
            suppressHydrationWarning
            data-scroll-behavior="smooth"
        >
            <body className="min-h-full flex flex-col font-sans">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}