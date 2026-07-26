type AuthCardProps = {
    children: React.ReactNode;
};

export default function AuthCard({ children }: AuthCardProps) {
    return (
        <div className="w-full max-w-md p-8 bg-card border border-border rounded-xl shadow-sm text-card-foreground">
            {children}
        </div>
    );
}