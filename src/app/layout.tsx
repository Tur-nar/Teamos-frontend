import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthProvider } from "@/features/auth/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TM Management",
  description: "Team management workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Suspense fallback={<main className="grid min-h-screen place-items-center bg-[#f5f7f4] text-sm text-[#58645c]" aria-live="polite">Loading your session...</main>}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
