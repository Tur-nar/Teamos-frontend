"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrganizationSummary } from "@/types/organization";

type OwnerOnboardingProps = {
  organization: OrganizationSummary | null;
  onContinue: () => void;
};

export function OwnerOnboarding({ organization, onContinue }: OwnerOnboardingProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle>You&apos;re ready to lead your workspace</CardTitle>
          <CardDescription>
            Your new organization workspace is set up. Projects belong to the organization, and members collaborate inside it.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm text-muted-foreground">
          {organization ? (
            <div className="rounded-md border bg-muted/30 p-3">
              <p className="font-medium text-foreground">{organization.name}</p>
              <p className="text-sm text-muted-foreground">{organization.slug}</p>
            </div>
          ) : null}
          <p>Projects live inside your organization workspace, so planning and delivery stay connected.</p>
          <p>Members can collaborate across projects, while owners and admins can invite teammates and manage access.</p>
          <p>Roles include owner, admin, supervisor, and member, giving you flexibility as your team grows.</p>
          <Button className="w-full" onClick={onContinue}>
            Continue to dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
