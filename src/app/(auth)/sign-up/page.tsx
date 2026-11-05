import { Suspense } from "react";

import { AuthFormFallback, AuthShell } from "@/features/auth/components/auth-shell";
import { AuthForm } from "@/features/auth/components/auth-form";

export default function SignUpPage({ searchParams }: PageProps<"/sign-up">) {
  return (
    <AuthShell mode="sign-up">
      <Suspense fallback={<AuthFormFallback mode="sign-up" />}>
        <SignUpContent searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}

async function SignUpContent({ searchParams }: Pick<PageProps<"/sign-up">, "searchParams">) {
  const params = await searchParams;
  const candidate = params.returnTo;
  const returnTo = typeof candidate === "string" && /^\/invite\/[^/?#]+$/.test(candidate)
    ? candidate
    : undefined;
  return <AuthForm mode="sign-up" returnTo={returnTo} />;
}
