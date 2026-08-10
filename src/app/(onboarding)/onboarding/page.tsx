"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { useOrganizations } from "@/hooks/organization/use-organizations";

import { CreateOrganizationForm } from "@/components/onboarding/create-organization-form";
import { InvitationCenter } from "@/components/onboarding/invitation-center";
import { InvitedOnboarding } from "@/components/onboarding/invited-onboarding";
import { OwnerOnboarding } from "@/components/onboarding/owner-onboarding";
import type { OrganizationSummary, UserInvitation } from "@/types/organization";

export default function OnboardingPage() {
  const router = useRouter();

  const {
    user,
    loading,
    organizations,
    hasOrganizations,
    pendingInvitations,
    hasPendingInvitations,
    isLoadingOrganizations,
    isCreating,
    isAccepting,
    error,
    createOrganization,
    acceptInvitation,
  } = useOrganizations();

  const [postOnboardingFlow, setPostOnboardingFlow] = useState<"owner" | "invited" | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createdOrganization, setCreatedOrganization] = useState<OrganizationSummary | null>(null);
  const [selectedInvitation, setSelectedInvitation] = useState<UserInvitation | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace(ROUTES.auth.signIn);
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!loading && user && hasOrganizations && !postOnboardingFlow) {
      router.replace(ROUTES.dashboard);
    }
  }, [hasOrganizations, loading, postOnboardingFlow, router, user]);

  if (loading || isLoadingOrganizations) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading your workspace...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (postOnboardingFlow === "owner") {
    return (
      <OwnerOnboarding
        organization={createdOrganization}
        onContinue={() => {
          setPostOnboardingFlow(null);
          router.replace(ROUTES.dashboard);
        }}
      />
    );
  }

  if (postOnboardingFlow === "invited") {
    return (
      <InvitedOnboarding
        invitation={selectedInvitation}
        onContinue={() => {
          setPostOnboardingFlow(null);
          router.replace(ROUTES.dashboard);
        }}
      />
    );
  }

  async function handleCreateOrganization(event: FormEvent<HTMLFormElement>, name: string, slug: string) {
    event.preventDefault();

    if (!name.trim() || !slug.trim()) {
      return;
    }

    const createdOrganization = await createOrganization(name.trim(), slug.trim());

    if (createdOrganization?.id) {
      setCreatedOrganization(createdOrganization);
      setSelectedInvitation(null);
      setPostOnboardingFlow("owner");
      setShowCreateForm(false);
    }
  }

  async function handleAcceptInvitation(invitationId: string) {
    const invitationToAccept = pendingInvitations.find((invitation) => invitation.id === invitationId) ?? null;
    const acceptedInvitation = await acceptInvitation(invitationId);

    if (acceptedInvitation) {
      setCreatedOrganization(null);
      setSelectedInvitation(invitationToAccept);
      setPostOnboardingFlow("invited");
      setShowCreateForm(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Organization onboarding
        </p>

        <h1 className="text-3xl font-semibold">Welcome, {user.name ?? "there"}</h1>

        <p className="text-muted-foreground">
          Every project in TM-Management belongs to an organization. Create your own workspace or join one you&apos;ve been invited to.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {showCreateForm || !hasPendingInvitations ? (
            <CreateOrganizationForm
              isCreating={isCreating}
              error={error}
              onSubmit={handleCreateOrganization}
            />
          ) : null}

          {hasPendingInvitations && !showCreateForm ? (
            <InvitationCenter
              invitations={pendingInvitations}
              isAccepting={isAccepting}
              error={error}
              onAcceptInvitation={handleAcceptInvitation}
              onSwitchToCreate={() => setShowCreateForm(true)}
            />
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">What happens next</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Every project belongs to an organization workspace.</p>
              <p>Owners can invite administrators, supervisors, and members.</p>
              <p>Invited teammates join securely through the onboarding flow.</p>
            </div>
          </div>

          {organizations.length > 0 ? (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Your organizations</h2>
              <ul className="mt-4 space-y-3">
                {organizations.map((organization) => (
                  <li key={organization.id} className="rounded-md border p-4">
                    <p className="font-medium">{organization.name}</p>
                    <p className="text-sm text-muted-foreground">{organization.slug}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
