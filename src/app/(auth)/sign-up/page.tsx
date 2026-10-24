import AuthCard from "@/components/auth/auth-card";
import AuthHeader from "@/components/auth/auth-header";
import SignUpForm from "@/components/auth/sign-up-form";

export default function SignUpPage() {
    return (
        <AuthCard>
            <AuthHeader
                title="Create your account"
                description="Join TM-Management and start collaborating."
            />
            <SignUpForm />
        </AuthCard>
    );
}