"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { SignInEmailValues } from "@/types/auth";
import { useSignIn } from "@/hooks/auth/use-sign-in";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import signInSchema from "@/schemas/auth/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignInForm() {
    const router = useRouter();
    const signIn = useSignIn();
    const form = useForm<SignInEmailValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
        email: "",
        password: "",
    },
    });
    const isLoading =
        form.formState.isSubmitting || signIn.isPending;

   async function onSubmit(values: SignInEmailValues) {
    try {
        const response = await signIn.mutateAsync(values);

        console.log(response);

        if (response?.error) {
            toast.error(response.error.message || "Something went wrong");
        } else {
            toast.success("Login successful");
            router.push(ROUTES.onboarding);
        }
    } catch (error) {
        console.error("Sign in failed:", error);
        toast.error("Sign in failed");
    }
}

    return (
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-8"
        >
            <FieldSet className="w-full max-w-md">
                <FieldGroup>

                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>

                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            disabled={isLoading}
                            {...form.register("email")}
                        />

                        <FieldDescription>
                            Use the email connected to your workspace.
                        </FieldDescription>

                        {form.formState.errors.email && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </Field>


                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>

                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <PasswordInput
                            id="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            disabled={isLoading}
                            {...form.register("password")}
                        />

                        <FieldDescription>
                            Your password is never stored in the browser.
                        </FieldDescription>

                        {form.formState.errors.password && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </Field>

                </FieldGroup>
            </FieldSet>


           <Button
              type="submit"
              disabled={isLoading}
              className="w-full transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
              {isLoading ? (
                  <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                  </>
              ) : (
                  "Sign In"
              )}
          </Button>


            <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href={ROUTES.auth.signUp}
                    className="font-medium text-primary hover:underline"
                >
                    Create one
                </Link>
            </p>
        </form>
    );
}