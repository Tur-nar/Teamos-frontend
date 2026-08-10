"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10">
            <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Dashboard</p>
                <h1 className="text-3xl font-semibold">Your workspace is ready</h1>
                <p className="text-muted-foreground">
                    This area is reserved for your active organization workspace once onboarding is complete.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active workspace</CardTitle>
                    <CardDescription>
                        Organization management and project views will appear here as the next phase evolves.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        The onboarding experience now lives on the dedicated onboarding route.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
