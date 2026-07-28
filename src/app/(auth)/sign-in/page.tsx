import SignInForm from "@/components/auth/sign-in-form";
import AuthCard from "@/components/auth/auth-card";
import AuthLayout from "@/components/auth/auth-layout";
import AuthHeader from "@/components/auth/auth-header";

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome back"
          description="Sign in to continue managing your team and projects."
        />
        <SignInForm />
      </AuthCard>
    </AuthLayout>
  );
}