"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth/auth-client";
import { ROUTES } from "@/constants/routes";

import { useListOrganizations } from "@/hooks/organization/use-list-organizations";
import { useListInvitations } from "@/hooks/organization/use-list-invitations";
import { useCreateOrganization } from "@/hooks/organization/use-create-organization";
import { useAcceptInvitation } from "@/hooks/organization/use-accept-invitation";
import { useSetActiveOrganization } from "@/hooks/organization/use-set-active-organization";

import { CreateOrganizationForm } from "@/components/onboarding/create-organization-form";
import { InvitationCenter } from "@/components/onboarding/invitation-center";
import { InvitedOnboarding } from "@/components/onboarding/invited-onboarding";
import { OwnerOnboarding } from "@/components/onboarding/owner-onboarding";
import type { OrganizationSummary, UserInvitation } from "@/types/organization";

export default function OnboardingPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user ?? null;

    const { data: organizations = [], isLoading: orgsLoading } = useListOrganizations();
    const { data: pendingInvitations = [] } = useListInvitations();

    const createOrg = useCreateOrganization();
    const acceptInv = useAcceptInvitation();
    const setActive = useSetActiveOrganization();

    const [postOnboardingFlow, setPostOnboardingFlow] = useState<"owner" | "invited" | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createdOrganization, setCreatedOrganization] = useState<OrganizationSummary | null>(null);
    const [selectedInvitation, setSelectedInvitation] = useState<UserInvitation | null>(null);

    const hasOrganizations = organizations.length > 0;
    const hasPendingInvitations = pendingInvitations.length > 0;
    const isCreating = createOrg.isPending || setActive.isPending;
    const isAccepting = acceptInv.isPending || setActive.isPending;

    const error =
        createOrg.error?.message ??
        acceptInv.error?.message ??
        setActive.error?.message ??
        null;

    if (!orgsLoading && hasOrganizations && !postOnboardingFlow) {
        router.replace(ROUTES.dashboard);
        return null;
    }

    async function handleCreateOrganization(
        event: FormEvent<HTMLFormElement>,
        name: string,
        slug: string,
    ) {
        event.preventDefault();
        if (!name.trim() || !slug.trim()) return;

        try {
            const newOrg = await createOrg.mutateAsync({
                name: name.trim(),
                slug: slug.trim(),
            });

            if (newOrg?.id) {
                await setActive.mutateAsync({ organizationId: newOrg.id });
                setCreatedOrganization(newOrg);
                setSelectedInvitation(null);
                setPostOnboardingFlow("owner");
                setShowCreateForm(false);
            }
        } catch {
        }
    }

    async function handleAcceptInvitation(invitationId: string) {
        const target = pendingInvitations.find((inv) => inv.id === invitationId) ?? null;

        try {
            await acceptInv.mutateAsync({ invitationId });

            if (target?.organizationId) {
                await setActive.mutateAsync({ organizationId: target.organizationId });
            }

            setCreatedOrganization(null);
            setSelectedInvitation(target);
            setPostOnboardingFlow("invited");
            setShowCreateForm(false);
        } catch {
        }
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

    // ── Main onboarding UI ────────────────────────────────────────────────────

    return (
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10">
            <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    Organization onboarding
                </p>

                <h1 className="text-3xl font-semibold">
                    Welcome, {user?.name ?? "there"}
                </h1>

                <p className="text-muted-foreground">
                    Every project in TM-Management belongs to an organization. Create your
                    own workspace or join one you&apos;ve been invited to.
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
                                {organizations.map((org) => (
                                    <li key={org.id} className="rounded-md border p-4">
                                        <p className="font-medium">{org.name}</p>
                                        <p className="text-sm text-muted-foreground">{org.slug}</p>
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
