import SignUpForm from "@/components/auth/sign-up-form";
import AuthCard from "@/components/auth/auth-card"
import AuthLayout from "@/components/auth/auth-layout"
import AuthHeader from "@/components/auth/auth-header"

export default function SignUp() {
    return (
        <>
            <AuthLayout>
                <AuthCard>
                    <AuthHeader
                        title="Create your account"
                        description="Join TM-Management and start collaborating."
                    />
                    <SignUpForm />
                </AuthCard>
            </AuthLayout>
        </>
    );
}