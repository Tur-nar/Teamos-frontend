import type { Metadata } from "next";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
