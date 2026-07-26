type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6">
            {children}
        </main>
    );
}