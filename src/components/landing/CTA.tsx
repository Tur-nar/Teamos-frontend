import Section from "@/components/layout/section";

export default function CTA() {
    return (
        <Section>
            <div className="text-center bg-primary px-8 py-16 rounded-lg">
                <h2 className="text-3xl font-bold">Ready to build a more productive team?</h2>
                <p className="text-lg mt-4">Create your organization, invite your team, manage projects, track progress, and collaborate from one modern workspace. Join hundreds of teams simplifying work with TM-Management.</p>
                <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto">
                    <button className="inline-block bg-primary-foreground text-primary font-bold mx-3 py-3 px-6 rounded-lg shadow-md hover:bg-primary hover:text-foreground transition-colors hover:border-transparent translate-y-1 duration-300">
                        Create Workspace
                    </button>
                    <button className="inline-block bg-transparent border-2 border-primary text-primary-foreground font-bold mx-3 py-3 px-6 rounded-lg shadow-md hover:bg-primary hover:text-foreground transition-colors hover:border-transparent translate-y-1 scale-105 duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        </Section>
    );
}