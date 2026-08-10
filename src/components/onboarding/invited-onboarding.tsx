"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserInvitation } from "@/types/organization";

type InvitedOnboardingProps = {
  invitation: UserInvitation | null;
  onContinue: () => void;
};

export function InvitedOnboarding({ invitation, onContinue }: InvitedOnboardingProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle>You&apos;re now part of an organization</CardTitle>
          <CardDescription>
            Your invitation has been accepted. You can start collaborating in the shared workspace straight away.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm text-muted-foreground">
          {invitation ? (
            <div className="rounded-md border bg-muted/30 p-3">
              <p className="font-medium text-foreground">{invitation.organizationName ?? invitation.organizationId}</p>
              <p className="text-sm text-muted-foreground">Role: {invitation.role}</p>
            </div>
          ) : null}
          <p>Your assigned role determines which workspace actions are available to you.</p>
          <p>The organization workspace is where projects, members, and collaboration come together.</p>
          <Button className="w-full" onClick={onContinue}>
            Continue to dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
