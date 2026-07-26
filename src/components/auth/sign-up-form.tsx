"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpSchema from "@/schemas/auth/sign-up.schema";
import { Button } from "../ui/button";
import { 
    Field,  
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
 } from "../ui/field";
 import { Input } from "@/components/ui/input"
 import { type SignUpEmailValues } from "@/types/auth";
import { signUpUser } from "@/services/auth/auth.service";
import { Loader2 } from "lucide-react";


export default function SignUpForm() {

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
        try{
            const response = await signUpUser(values);

            console.log(response);  
        }catch(error){
            console.error("Sign up failed:", error);
        }

    }   
    
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             <FieldSet className="w-full max-w-xs">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" type="text" placeholder="Enter your FullName" {...form.register("name")} />
                        <FieldDescription>
                            Enter your FullName.
                        </FieldDescription>
                        {form.formState.errors.name && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="Enter your email" {...form.register("email")} />
                        <FieldDescription>
                            Enter your email.
                        </FieldDescription>
                        {form.formState.errors.email && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </Field>
                    <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" placeholder="••••••••" {...form.register("password")} />
                    <FieldDescription>
                        Must be at least 8 characters long.
                    </FieldDescription>
                    {form.formState.errors.password && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </Field>
                    <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" {...form.register("confirmPassword")} />
                    <FieldDescription>
                        Must match your password.
                    </FieldDescription>
                    {form.formState.errors.confirmPassword && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )}
                    </Field>
                </FieldGroup>
            </FieldSet>
                        
            <Button type="submit" disabled={form.formState.isSubmitting} className="bg-primary text-primary-foreground">
                {form.formState.isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    "Sign Up"
                )}
            </Button>
        </form>
    );
}
