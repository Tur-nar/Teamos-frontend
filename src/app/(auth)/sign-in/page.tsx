import AuthCard from "@/components/auth/auth-card";
import AuthHeader from "@/components/auth/auth-header";
import SignInForm from "@/components/auth/sign-in-form";



export default function SignInPage() {
    return (
        <AuthCard>
            <AuthHeader
                title="Welcome back"
                description="Sign in to continue managing your team and projects."
            />
            <SignInForm />
        </AuthCard>
    );
}