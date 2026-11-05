import { Suspense } from "react";

import { AuthFormFallback, AuthShell } from "@/features/auth/components/auth-shell";
import { AuthForm } from "@/features/auth/components/auth-form";

export default function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  return (
    <AuthShell mode="sign-in">
      <Suspense fallback={<AuthFormFallback mode="sign-in" />}>
        <SignInContent searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}

async function SignInContent({ searchParams }: Pick<PageProps<"/sign-in">, "searchParams">) {
  const params = await searchParams;
  const candidate = params.returnTo;
  const returnTo = typeof candidate === "string" && /^\/invite\/[^/?#]+$/.test(candidate)
    ? candidate
    : undefined;
  return <AuthForm mode="sign-in" returnTo={returnTo} />;
}
