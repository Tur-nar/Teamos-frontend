type AuthCardProps = {
    children: React.ReactNode;
};

export default function AuthCard({ children }: AuthCardProps) {
    return (
        <div className="item-center justify-center w-2xl max-w-md p-10 bg-card border border-border rounded-xl shadow-sm text-card-foreground">
            {children}
        </div>
    );
}