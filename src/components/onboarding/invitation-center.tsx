"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserInvitation } from "@/types/organization";

type InvitationCenterProps = {
  invitations: UserInvitation[];
  isAccepting: boolean;
  error: string | null;
  onAcceptInvitation: (invitationId: string) => Promise<void>;
  onSwitchToCreate: () => void;
};

function formatDate(value: Date | string | null) {
  if (!value) {
    return "No expiration";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "No expiration";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function InvitationCenter({
  invitations,
  isAccepting,
  error,
  onAcceptInvitation,
  onSwitchToCreate,
}: InvitationCenterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending invitations</CardTitle>
        <CardDescription>Select the invitation you want to accept, or create your own organization instead.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error ? (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {invitations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending invitations were found.</p>
        ) : (
          <div className="space-y-3">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{invitation.organizationName ?? invitation.organizationId}</p>
                    <p className="text-sm text-muted-foreground">
                      Role: <span className="capitalize">{invitation.role}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: <span className="capitalize">{invitation.status}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires: {formatDate(invitation.expiresAt)}
                    </p>
                  </div>

                  <Button onClick={() => void onAcceptInvitation(invitation.id)} disabled={isAccepting}>
                    {isAccepting ? "Joining..." : "Accept Invitation"}
                  </Button>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">Invitation ID: {invitation.id}</p>
              </div>
            ))}
          </div>
        )}

        <Button variant="outline" className="w-full" onClick={onSwitchToCreate}>
          Create your own organization instead
        </Button>
      </CardContent>
    </Card>
  );
}
