"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth/auth-client";
import { ROUTES } from "@/constants/routes";

import { useListOrganizations } from "@/hooks/organization/use-list-organizations";
import { useListInvitations } from "@/hooks/organization/use-list-invitations";
import { useCreateOrganization } from "@/hooks/organization/use-create-organization";
import { useAcceptInvitation } from "@/hooks/organization/use-accept-invitation";
import { useSetActiveOrganization } from "@/hooks/organization/use-set-active-organization";
import { useUploadOrgLogo } from "@/hooks/organization/use-upload-org-logo";
import { useCompleteOnboarding } from "@/hooks/user/use-complete-onboarding";
import { useInviteMember } from "@/hooks/organization/use-invite-member";
import { StepOrgDetails } from "@/components/onboarding/step-org-details";
import { StepInviteMembers } from "@/components/onboarding/step-invite-members";
import { InvitationCenter } from "@/components/onboarding/invitation-center";
import { OwnerOnboarding } from "@/components/onboarding/owner-onboarding";
import { InvitedOnboarding } from "@/components/onboarding/invited-onboarding";
import type { OrganizationSummary, UserInvitation } from "@/types/organization";
import type { OrganizationMemberRole } from "@/types/auth";

type WizardStep = "org-details" | "invite-members" | "success-owner" | "success-invited";

export default function OnboardingPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user ?? null;

    const { data: organizations = [], isLoading: orgsLoading } = useListOrganizations();
    const { data: pendingInvitations = [] } = useListInvitations();

    const createOrg = useCreateOrganization();
    const acceptInv = useAcceptInvitation();
    const setActive = useSetActiveOrganization();
    const uploadLogo = useUploadOrgLogo();
    const completeOnboarding = useCompleteOnboarding();
    const inviteMember = useInviteMember();

    const [step, setStep] = useState<WizardStep>("org-details");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createdOrg, setCreatedOrg] = useState<OrganizationSummary | null>(null);
    const [selectedInvitation, setSelectedInvitation] = useState<UserInvitation | null>(null);

    const hasOrganizations = organizations.length > 0;
    const hasPendingInvitations = pendingInvitations.length > 0;
    const isCreating = createOrg.isPending || uploadLogo.isPending || setActive.isPending;
    const isSendingInvites = inviteMember.isPending;

    // Only redirect to dashboard if the user has orgs AND is already onboarded.
    // If onboarded is false, they belong here even if they have orgs.
    const isAlreadyOnboarded = (session?.user as { onboarded?: boolean })?.onboarded === true;

    useEffect(() => {
        if (!orgsLoading && hasOrganizations && isAlreadyOnboarded && step === "org-details" && !showCreateForm) {
            router.replace(ROUTES.dashboard);
        }
    }, [orgsLoading, hasOrganizations, isAlreadyOnboarded, step, showCreateForm, router]);

    if (!orgsLoading && hasOrganizations && isAlreadyOnboarded && step === "org-details" && !showCreateForm) {
        return null;
    }

    // ── Step 1: Org details + logo ────────────────────────────────────────────

    async function handleCreateOrganization(
        name: string,
        slug: string,
        logoFile: File | null,
    ) {
        let logoUrl: string | undefined;

        if (logoFile) {
            logoUrl = await uploadLogo.mutateAsync(logoFile);
        }

        const newOrg = await createOrg.mutateAsync({
            name,
            slug,
            logo: logoUrl ?? null,
        });

        if (newOrg?.id) {
            await setActive.mutateAsync({ organizationId: newOrg.id });
            setCreatedOrg(newOrg);
            setStep("invite-members");
        }
    }

    // ── Step 2: Invite members ────────────────────────────────────────────────

    async function handleSendInvites(
        rows: { email: string; role: OrganizationMemberRole }[],
    ): Promise<{ id: string; message: string }[]> {
        const errors: { id: string; message: string }[] = [];

        await Promise.allSettled(
            rows.map(async (row, i) => {
                try {
                    await inviteMember.mutateAsync({
                        email: row.email,
                        role: row.role,
                        organizationId: createdOrg?.id,
                    });
                } catch (err) {
                    errors.push({
                        id: String(i),
                        message: err instanceof Error ? err.message : "Failed to send invite",
                    });
                }
            }),
        );

        return errors;
    }

    // ── Finish: set onboarded flag and go to dashboard ────────────────────────

    async function handleFinish() {
        try {
            await completeOnboarding.mutateAsync();
        } catch {
            // Non-blocking: the flag is best effort; do not prevent navigation.
        }
        router.replace(ROUTES.dashboard);
    }

    // ── Accept invitation flow ────────────────────────────────────────────────

    async function handleAcceptInvitation(invitationId: string) {
        const target = pendingInvitations.find((inv) => inv.id === invitationId) ?? null;

        await acceptInv.mutateAsync({ invitationId });

        if (target?.organizationId) {
            await setActive.mutateAsync({ organizationId: target.organizationId });
        }

        setSelectedInvitation(target);
        setStep("success-invited");
    }

    // ── Render by step ────────────────────────────────────────────────────────

    if (step === "invite-members") {
        return (
            <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-10">
                <div className="mb-6 space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Step 2 of 2
                    </p>
                    <h1 className="text-2xl font-semibold">Invite your team</h1>
                </div>
                <StepInviteMembers
                    organizationId={createdOrg?.id ?? ""}
                    onInvite={handleSendInvites}
                    onSkip={() => void handleFinish()}
                    isSending={isSendingInvites}
                />
            </div>
        );
    }

    if (step === "success-owner") {
        return (
            <OwnerOnboarding
                organization={createdOrg}
                onContinue={() => void handleFinish()}
            />
        );
    }

    if (step === "success-invited") {
        return (
            <InvitedOnboarding
                invitation={selectedInvitation}
                onContinue={() => void handleFinish()}
            />
        );
    }

    // ── Step 1 UI ─────────────────────────────────────────────────────────────

    return (
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {hasPendingInvitations && !showCreateForm ? "You have an invitation" : "Step 1 of 2"}
                </p>

                <h1 className="text-3xl font-semibold">
                    Welcome, {user?.name ?? "there"}
                </h1>

                <p className="text-muted-foreground">
                    Every project in TeamOS belongs to an organization. Create your own workspace
                    or join one you&apos;ve been invited to.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                    {/* Show create form when: no pending invites, OR user explicitly chose to create */}
                    {(!hasPendingInvitations || showCreateForm) && (
                        <StepOrgDetails
                            isCreating={isCreating}
                            onSubmit={handleCreateOrganization}
                        />
                    )}

                    {/* Show invitation center when: there are pending invites and user hasn't chosen to create */}
                    {hasPendingInvitations && !showCreateForm && (
                        <InvitationCenter
                            invitations={pendingInvitations}
                            isAccepting={acceptInv.isPending || setActive.isPending}
                            error={acceptInv.error?.message ?? null}
                            onAcceptInvitation={handleAcceptInvitation}
                            onSwitchToCreate={() => setShowCreateForm(true)}
                        />
                    )}
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

                    {organizations.length > 0 && (
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
                    )}
                </div>
            </div>
        </div>
    );
}
