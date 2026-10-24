"use client";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { Building2, Upload, X, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type StepOrgDetailsProps = {
    isCreating: boolean;
    onSubmit: (name: string, slug: string, logoFile: File | null) => Promise<void>;
};

function slugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
}

export function StepOrgDetails({ isCreating, onSubmit }: StepOrgDetailsProps) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [slugTouched, setSlugTouched] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setName(val);
        if (!slugTouched) setSlug(slugify(val));
    }

    function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
        setSlugTouched(true);
        setSlug(slugify(e.target.value));
    }

    function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        const allowed = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
        if (!allowed.includes(file.type)) {
            setError("Logo must be a JPEG, PNG, GIF, or WEBP image.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Logo must be smaller than 5 MB.");
            return;
        }

        setError(null);
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
    }

    function removeLogo() {
        setLogoFile(null);
        setLogoPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !slug.trim()) {
            setError("Organization name and slug are required.");
            return;
        }
        setError(null);
        try {
            await onSubmit(name.trim(), slug.trim(), logoFile);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Name your workspace</CardTitle>
                <CardDescription>
                    Every project in TeamOS belongs to an organization. You can add a logo to make
                    it yours.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-5" onSubmit={(e) => void handleSubmit(e)}>
                    {/* Logo upload */}
                    <div className="space-y-2">
                        <Label>Organization Logo <span className="text-muted-foreground font-normal">(optional)</span></Label>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 transition hover:border-primary hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label="Upload organization logo"
                            >
                                {logoPreview ? (
                                    <Image
                                        src={logoPreview}
                                        alt="Logo preview"
                                        fill
                                        className="rounded-xl object-cover"
                                    />
                                ) : (
                                    <Building2 className="h-6 w-6 text-muted-foreground" />
                                )}
                            </button>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => fileRef.current?.click()}
                                    >
                                        <Upload className="mr-1.5 h-3.5 w-3.5" />
                                        {logoPreview ? "Change" : "Upload"}
                                    </Button>
                                    {logoPreview && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={removeLogo}
                                            aria-label="Remove logo"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </Button>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    JPEG, PNG, GIF or WEBP · max 5 MB
                                </p>
                            </div>

                            <input
                                ref={fileRef}
                                id="org-logo-input"
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                className="sr-only"
                                onChange={handleLogoChange}
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input
                            id="org-name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Acme Studio"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <Label htmlFor="org-slug">
                            Slug
                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                                auto-derived, editable
                            </span>
                        </Label>
                        <Input
                            id="org-slug"
                            value={slug}
                            onChange={handleSlugChange}
                            placeholder="acme-studio"
                            required
                            disabled
                        />
                        <p className="text-xs text-muted-foreground">
                            Used in URLs. Letters, numbers, and hyphens only.
                        </p>
                    </div>

                    {error && (
                        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <Button type="submit" className="w-full" disabled={isCreating}>
                        {isCreating ? "Creating workspace…" : "Create workspace"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
