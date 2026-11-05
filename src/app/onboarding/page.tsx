"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Building2, ImagePlus } from "lucide-react";

import { AuthGuard } from "@/features/auth/components/auth-guard";
import { useCreateOrganization } from "@/features/onboarding/hooks/use-create-organization";
import { OwnerInviteStep } from "@/features/onboarding/components/owner-invite-step";
import { useInvitations } from "@/features/organizations/hooks/use-invitations";
import { useAuth } from "@/features/auth/providers/auth-provider";

const MAX_LOGO_SIZE = 5 * 1024 * 1024;
const ALLOWED_LOGO_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function OnboardingPage() {
  const { user } = useAuth();
  const invitations = useInvitations();
  const createOrganization = useCreateOrganization();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showInviteStep, setShowInviteStep] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [brandColor, setBrandColor] = useState("");
  const [logoFile, setLogoFile] = useState<File | undefined>();
  const [logoError, setLogoError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const submitError = createOrganization.error instanceof Error
    ? createOrganization.error.message
    : null;

  function handleNameChange(value: string) {
    setName(value);
    if (!slugEdited) {
      setSlug(createSlug(value));
    }
  }

  function handleLogoChange(file: File | undefined) {
    setLogoError(null);
    setLogoFile(undefined);
    if (!file) return;

    if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
      setLogoError("Choose a JPEG, PNG, GIF, or WEBP image.");
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      setLogoError("Logo files must be 5 MB or smaller.");
      return;
    }
    setLogoFile(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const normalizedSlug = createSlug(slug);
    if (!name.trim()) {
      setFormError("Enter an organization name.");
      return;
    }
    if (!normalizedSlug) {
      setFormError("Enter a valid organization slug using letters or numbers.");
      return;
    }
    if (brandColor && !/^#[0-9A-Fa-f]{6}$/.test(brandColor)) {
      setFormError("Enter a valid six-digit hex color, such as #22583A.");
      return;
    }
    if (logoError) {
      setFormError(logoError);
      return;
    }

    try {
      await createOrganization.submit({
        name: name.trim(),
        slug: normalizedSlug,
        ...(brandColor ? { brandColor } : {}),
        ...(logoFile ? { logoFile } : {}),
      });
      setShowInviteStep(true);
    } catch {
      return;
    }
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#f5f7f4] px-5 py-10 text-[#17251c] sm:px-8 sm:py-14">
        <section className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase text-[#3a7552]">TeamOS / Getting started</p>
          {showInviteStep ? (
            <OwnerInviteStep completeOnboarding={createOrganization.complete} />
          ) : !showCreateForm ? (
            <>
              <h1 className="mt-3 text-3xl font-semibold">Choose how to join your team.</h1>
              <p className="mt-3 text-sm leading-6 text-[#667168]">Create a workspace for your team, or accept an invitation to join an existing one.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button className="group border border-[#b7cbb9] bg-white p-6 text-left transition hover:border-[#35724d] hover:bg-[#f9fcf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22583a]" onClick={() => setShowCreateForm(true)} type="button">
                  <Building2 aria-hidden="true" className="text-[#35724d]" size={22} />
                  <span className="mt-5 block text-lg font-semibold">Create an organization</span>
                  <span className="mt-2 block text-sm leading-6 text-[#667168]">Start a workspace for your own team.</span>
                  <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#22583a]">Continue <ArrowRight aria-hidden="true" size={16} /></span>
                </button>
                <article className="border border-[#d9e0d9] bg-white p-6 opacity-80">
                  <h2 className="text-lg font-semibold">Join an organization</h2>
                  <p className="mt-2 text-sm leading-6 text-[#667168]">Accept an invitation and join an existing team workspace.</p>
                  {user?.emailVerified ? (
                    invitations.isPending ? <p className="mt-5 text-xs text-[#667168]">Checking invitations...</p>
                      : invitations.isError ? <p className="mt-5 text-xs text-[#8a3527]">Could not load invitations. Refresh to try again.</p>
                        : invitations.data?.filter((invitation) => invitation.status === "pending").length ? (
                          <ul className="mt-5 space-y-3 border-t border-[#e2e8e2] pt-4">
                            {invitations.data.filter((invitation) => invitation.status === "pending").map((invitation) => (
                              <li className="flex flex-wrap items-center justify-between gap-3" key={invitation.id}>
                                <span className="min-w-0 text-sm"><span className="block truncate font-semibold">{invitation.organizationName}</span><span className="text-xs text-[#667168]">Invited as {invitation.role}</span></span>
                                <a className="inline-flex h-9 items-center gap-2 rounded bg-[#22583a] px-3 text-sm font-semibold text-white hover:bg-[#19472e]" href={`/invite/${encodeURIComponent(invitation.id)}`}>Review <ArrowRight aria-hidden="true" size={15} /></a>
                              </li>
                            ))}
                          </ul>
                        ) : <p className="mt-5 text-xs font-medium text-[#667168]">No pending invitations. Ask an organization owner to invite you.</p>
                  ) : <p className="mt-5 text-xs font-medium text-[#667168]">Sign in with your invited email to review invitations.</p>}
                </article>
              </div>
            </>
          ) : (
            <div className="mt-3 max-w-2xl">
              <button className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#526257] hover:text-[#183d2b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22583a]" onClick={() => setShowCreateForm(false)} type="button">
                <ArrowLeft aria-hidden="true" size={16} /> Back to choices
              </button>
              <h1 className="text-3xl font-semibold">Create your organization</h1>
              <p className="mt-3 text-sm leading-6 text-[#667168]">Set up the basics for your team workspace.</p>

              <form className="mt-8 space-y-5 border border-[#d9e0d9] bg-white p-5 sm:p-7" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium" htmlFor="organization-name">
                  Organization name <span className="text-[#a83e30">*</span>
                  <input autoComplete="organization" className="mt-2 h-11 w-full rounded border border-[#cdd5ce] px-3 text-sm outline-none focus:border-[#35724d] focus:ring-2 focus:ring-[#35724d]/20" id="organization-name" maxLength={100} onChange={(event) => handleNameChange(event.target.value)} required value={name} />
                </label>

                <label className="block text-sm font-medium" htmlFor="organization-slug">
                  Workspace slug <span className="text-[#a83e30">*</span>
                  <span className="mt-2 flex h-11 items-center rounded border border-[#cdd5ce] bg-white focus-within:border-[#35724d] focus-within:ring-2 focus-within:ring-[#35724d]/20">
                    <span className="pl-3 text-sm text-[#667168]">/</span>
                    <input autoComplete="off" className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" id="organization-slug" maxLength={80} onChange={(event) => { setSlug(event.target.value); setSlugEdited(true); }} required value={slug} />
                  </span>
                  <span className="mt-1 block text-xs font-normal text-[#667168]">Lowercase letters, numbers, and hyphens.</span>
                </label>

                <label className="block text-sm font-medium" htmlFor="organization-color">
                  Brand color <span className="font-normal text-[#667168]">(optional)</span>
                  <span className="mt-2 flex h-11 items-center gap-3 rounded border border-[#cdd5ce] px-3">
                    <input aria-label="Choose brand color" className="size-7 cursor-pointer border-0 bg-transparent p-0" id="organization-color-picker" onChange={(event) => setBrandColor(event.target.value)} type="color" value={brandColor || "#22583a"} />
                    <input className="min-w-0 flex-1 text-sm uppercase outline-none" id="organization-color" maxLength={7} onChange={(event) => setBrandColor(event.target.value)} placeholder="#22583A" value={brandColor} />
                  </span>
                </label>

                <div>
                  <span className="block text-sm font-medium">Organization logo <span className="font-normal text-[#667168]">(optional)</span></span>
                  <label className="mt-2 flex min-h-16 cursor-pointer items-center gap-3 rounded border border-dashed border-[#b8c6b9] px-4 py-3 transition hover:bg-[#f8fbf7] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#22583a]">
                    <ImagePlus aria-hidden="true" className="shrink-0 text-[#35724d]" size={20} />
                    <span className="min-w-0 text-sm">
                      <span className="block truncate font-medium">{logoFile?.name ?? "Choose an image"}</span>
                      <span className="mt-1 block text-xs text-[#667168]">JPEG, PNG, GIF, or WEBP · up to 5 MB</span>
                    </span>
                    <input accept="image/jpeg,image/png,image/gif,image/webp" className="sr-only" onChange={(event) => handleLogoChange(event.target.files?.[0])} type="file" />
                  </label>
                  {logoError && <p className="mt-2 text-sm text-[#8a3527]" role="alert">{logoError}</p>}
                </div>

                {(formError || submitError) && <p className="rounded border border-[#d6aaa0] bg-[#fff4f1] px-3 py-2.5 text-sm leading-5 text-[#8a3527]" role="alert">{formError ?? submitError}</p>}

                <button className="flex h-11 w-full items-center justify-center gap-2 rounded bg-[#22583a] px-4 text-sm font-semibold text-white transition hover:bg-[#19472e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22583a] disabled:cursor-not-allowed disabled:opacity-60" disabled={createOrganization.isPending || Boolean(logoError)} type="submit">
                  {createOrganization.isPending
                    ? createOrganization.progress?.active
                      ? "Completing setup..."
                      : createOrganization.retrying
                        ? "Activating workspace..."
                        : "Creating workspace..."
                    : createOrganization.retrying
                      ? "Retry setup"
                      : "Create organization"}
                  {!createOrganization.isPending && <ArrowRight aria-hidden="true" size={16} />}
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
    </AuthGuard>
  );
}
