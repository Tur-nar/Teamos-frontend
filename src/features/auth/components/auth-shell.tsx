import { Layers3, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

type AuthMode = "sign-in" | "sign-up";

type AuthShellProps = {
  mode: AuthMode;
  children: ReactNode;
};

export function AuthShell({ mode, children }: AuthShellProps) {
  const isSignUp = mode === "sign-up";

  return (
    <main className="min-h-svh bg-zinc-100 px-4 py-6 text-zinc-900 sm:px-6 lg:min-h-svh lg:bg-zinc-100 lg:px-0 lg:py-0">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-none items-center justify-center lg:min-h-svh lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:overflow-hidden lg:rounded-none lg:bg-white lg:shadow-none">
        <aside
          aria-labelledby="team-brand-title"
          className="hidden lg:relative lg:flex lg:min-h-svh lg:flex-col lg:justify-between lg:overflow-hidden lg:border-r lg:border-zinc-200 lg:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_32%),linear-gradient(145deg,#171717_0%,#0d0d0d_100%)] lg:px-[clamp(2.5rem,4vw,5rem)] lg:py-10"
        >
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          <div className="relative flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-base font-semibold tracking-[-0.06em]"
            >
              T
            </span>
            <span className="text-sm font-medium tracking-[0.18em] text-zinc-200 uppercase">
              Task Management Pro
            </span>
          </div>

          <div className="relative mt-10 max-w-xl lg:mt-0 lg:py-10">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
              Productivity without noise
            </p>
            <h1
              className="mt-5 max-w-lg text-[2.5rem] font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[clamp(3.2rem,4vw,5rem)]"
              id="team-brand-title"
            >
              Task Management Pro
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-300 sm:text-base">
              Keep your projects, priorities, and teams aligned in one clear workspace designed for daily execution.
            </p>

            <div className="mt-10 hidden max-w-md space-y-4 border-t border-white/10 pt-6 lg:block">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                Built for clarity
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <UsersRound className="size-4 text-zinc-200" />
                  <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-zinc-400">People</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <Layers3 className="size-4 text-zinc-200" />
                  <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-zinc-400">Workflow</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <ShieldCheck className="size-4 text-zinc-200" />
                  <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-zinc-400">Access</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden items-center gap-3 text-zinc-300 lg:flex">
            <Sparkles className="size-4" />
            <span className="text-sm">Purpose-built for modern teams</span>
          </div>
        </aside>

        <section
          aria-labelledby="auth-heading"
          className="flex w-full items-center justify-center rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,15,15,0.08)] sm:p-7 sm:shadow-[0_18px_44px_rgba(15,15,15,0.06)] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none xl:p-0"
        >
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
                {isSignUp ? "Create account" : "Welcome back"}
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-zinc-950"
                id="auth-heading"
              >
                {isSignUp ? "Create your Task Management Pro account" : "Sign in to Task Management Pro"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isSignUp
                  ? "Get organized with a cleaner, faster way to manage work and keep your team aligned."
                  : "Access your workspace and continue the work that matters most."}
              </p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

export function AuthFormFallback({ mode }: { mode: AuthMode }) {
  const isSignUp = mode === "sign-up";

  return (
    <div aria-busy="true" role="status">
      <span className="sr-only">
        Loading {isSignUp ? "sign-up" : "sign-in"} form.
      </span>
      <div aria-hidden="true" className="space-y-5">
        {isSignUp && <AuthFieldSkeleton />}
        <AuthFieldSkeleton />
        <AuthFieldSkeleton />
        <div className="h-12 rounded-xl bg-zinc-100 motion-safe:animate-pulse motion-reduce:animate-none" />
      </div>
    </div>
  );
}

function AuthFieldSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-2">
      <div className="h-4 w-24 rounded-sm bg-zinc-200 motion-safe:animate-pulse motion-reduce:animate-none" />
      <div className="h-12 rounded-xl border border-zinc-200 bg-zinc-50" />
    </div>
  );
}
