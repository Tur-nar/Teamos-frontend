"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

import { ROUTES } from "@/constants/routes";
import { useSignUp } from "@/hooks/auth/use-sign-up";
import signUpSchema from "@/schemas/auth/sign-up.schema";
import type { SignUpEmailValues } from "@/types/auth";

export default function SignUpForm() {
    const router = useRouter();
    const signUp = useSignUp();

    const form = useForm<SignUpEmailValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: SignUpEmailValues) {
        try {
            const response = await signUp.mutateAsync(values);

            if (response?.error) {
                toast.error(
                    response.error.message ||
                    "Something went wrong. Please try again."
                );
                return;
            }

            toast.success("Account created successfully.");
            router.push(ROUTES.dashboard);
        } catch (error) {
            console.error("Sign up failed:", error);
            toast.error("Unable to create account.");
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
                        <FieldLabel htmlFor="name">
                            Name
                        </FieldLabel>

                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            disabled={signUp.isPending}
                            {...form.register("name")}
                        />

                        <FieldDescription>
                            Enter your full name.
                        </FieldDescription>

                        {form.formState.errors.name && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>

                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            disabled={signUp.isPending}
                            {...form.register("email")}
                        />

                        <FieldDescription>
                            Enter your email.
                        </FieldDescription>

                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">
                            Password
                        </FieldLabel>

                        <PasswordInput
                            id="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            disabled={signUp.isPending}
                            {...form.register("password")}
                        />

                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>

                        {form.formState.errors.password && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Confirm Password
                        </FieldLabel>

                        <PasswordInput
                            id="confirmPassword"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            disabled={signUp.isPending}
                            {...form.register("confirmPassword")}
                        />

                        <FieldDescription>
                            Must match your password.
                        </FieldDescription>

                        {form.formState.errors.confirmPassword && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )}
                    </Field>

                </FieldGroup>   
            </FieldSet>

            <Button
                type="submit"
                disabled={signUp.isPending}
                className="w-full transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
                {signUp.isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    "Sign Up"
                )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href={ROUTES.auth.signIn}
                    className="font-medium text-primary hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
}