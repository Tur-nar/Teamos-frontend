type AuthHeaderProps = {
    title: string;
    description: string;
};

export default function AuthHeader({
    title,
    description,
}: AuthHeaderProps) {
    return (
        <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-card-foreground">
                {title}
            </h1>

            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}