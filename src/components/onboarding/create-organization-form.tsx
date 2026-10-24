"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CreateOrganizationFormProps = {
  isCreating: boolean;
  error: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>, name: string, slug: string) => Promise<void>;
};

export function CreateOrganizationForm({ isCreating, error, onSubmit }: CreateOrganizationFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an organization</CardTitle>
        <CardDescription>
          You&apos;ll become the owner of this workspace and can invite members after setup.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={(event) => void onSubmit(event, name, slug)}>
          <div className="space-y-2">
            <Label htmlFor="organization-name">Organization Name</Label>
            <Input
              id="organization-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Acme Studio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization-slug">Slug</Label>
            <Input
              id="organization-slug"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              placeholder="acme-studio"
            />
          </div>

          {error ? (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Organization"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
