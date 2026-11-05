"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { useSignIn, useSignUp } from "@/features/auth/hooks/use-auth-actions";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
  returnTo?: string;
};

export function AuthForm({ mode, returnTo }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();
  const signIn = useSignIn();
  const signUp = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const mutation = isSignUp ? signUp : signIn;
  const errorMessage = mutation.error instanceof Error ? mutation.error.message : null;

  function validatePasswordMatch(nextPassword: string, nextConfirmPassword: string) {
    if (!isSignUp) {
      return null;
    }

    if (!nextConfirmPassword) {
      return "Please confirm your password.";
    }

    if (nextPassword !== nextConfirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionMessage(null);

    if (isSignUp) {
      const nextPasswordError = validatePasswordMatch(password, confirmPassword);
      setPasswordError(nextPasswordError);
      if (nextPasswordError) {
        return;
      }
    }

    try {
      if (isSignUp) {
        await signUp.mutateAsync({ name, email, password });
        setSubmissionMessage("Check your email for a verification link before signing in.");
        return;
      }

      const session = await signIn.mutateAsync({ email, password });
      if (returnTo) {
        router.replace(returnTo);
        return;
      }
      const onboarded = session?.user && "onboarded" in session.user
        ? session.user.onboarded === true
        : false;
      router.replace(onboarded ? "/dashboard" : "/onboarding");
    } catch {
      return;
    }
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {isSignUp && (
          <label className="block text-sm font-medium text-zinc-800" htmlFor="auth-name">
            Full name
            <input
              autoComplete="name"
              className="mt-2 h-12 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-500 focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10"
              id="auth-name"
              name="name"
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
          </label>
        )}
        <label className="block text-sm font-medium text-zinc-800" htmlFor="auth-email">
          Work email
          <input
            autoComplete="email"
            className="mt-2 h-12 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-500 focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10"
            id="auth-email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
        <label className="block text-sm font-medium text-zinc-800" htmlFor="auth-password">
          Password
          <span className="relative mt-2 block">
            <input
              autoComplete={isSignUp ? "new-password" : "current-password"}
              className="h-12 w-full rounded-md border border-zinc-200 bg-white px-3 pr-12 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-500 focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10"
              id="auth-password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
                if (isSignUp && confirmPassword) {
                  setPasswordError(validatePasswordMatch(event.target.value, confirmPassword));
                }
              }}
              required
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              aria-controls="auth-password"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-md text-zinc-500 transition hover:text-zinc-800 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-inset"
              onClick={() => setShowPassword((shown) => !shown)}
              type="button"
            >
              {showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
            </button>
          </span>
        </label>

        {isSignUp && (
          <label className="block text-sm font-medium text-zinc-800" htmlFor="auth-confirm-password">
            Confirm password
            <input
              autoComplete="new-password"
              className="mt-2 h-12 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-500 focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10"
              id="auth-confirm-password"
              name="confirmPassword"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                if (isSignUp) {
                  setPasswordError(validatePasswordMatch(password, event.target.value));
                }
              }}
              required
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
            />
          </label>
        )}

        {passwordError && (
          <p
            aria-atomic="true"
            aria-live="assertive"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700"
            role="alert"
          >
            {passwordError}
          </p>
        )}

        {errorMessage && (
          <p
            aria-atomic="true"
            aria-live="assertive"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        {submissionMessage && (
          <div
            aria-atomic="true"
            aria-live="polite"
            className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm leading-5 text-emerald-700"
            role="status"
          >
            <p>{submissionMessage}</p>
            {isSignUp && (
              <Link
                className="mt-2 inline-flex min-h-10 items-center font-semibold text-zinc-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                href={{
                  pathname: "/sign-in",
                  query: returnTo ? { returnTo } : undefined,
                }}
              >
                Continue to sign in
              </Link>
            )}
          </div>
        )}

        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={mutation.isPending}
          type="submit"
        >
          {mutation.isPending
            ? isSignUp
              ? "Creating account..."
              : "Signing in..."
            : isSignUp
              ? "Create account"
              : "Sign in"}
          {!mutation.isPending && <ArrowRight aria-hidden="true" size={16} />}
        </button>
      </form>

      <p className="mt-7 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-600">
        {isSignUp ? "Already have an account? " : "New to Task Management Pro? "}
        <Link
          className="min-h-10 font-semibold text-zinc-900 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          href={{
            pathname: isSignUp ? "/sign-in" : "/sign-up",
            query: returnTo ? { returnTo } : undefined,
          }}
        >
          {isSignUp ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </>
  );
}