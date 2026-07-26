import {howItWorks} from "@/data/howItWorks";
import Section from "@/components/layout/section";

export default function HowItWorks() {
    return (
        <Section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-8">
                <h2 className="text-3xl font-bold text-center text-foreground py-4">How It Works</h2>
                <p className="text-lg font-medium text-muted-foreground text-center mt-4">Everything you need to organize, collaborate and deliver projects successfully.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorks.map((step) => (
                        <div key={step.step} className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                                {step.step}
                            </div>
                            <h3 className="text-xl font-bold mt-4">{step.title}</h3>
                            <p className="text-muted-foreground mt-2">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}