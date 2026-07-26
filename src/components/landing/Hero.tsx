import Section from "@/components/layout/section";
export default function Hero() {
    return (
        <Section className="min-h-screen">
            <div className="flex items-center justify-between gap-16">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold leading-tight">Build, Collaborate and Manage Your Team&apos;s Work in One Workspace.</h1>
                    <p className="text-lg text-muted-foreground mt-6 leading-8">
                        Manage your tasks, collaborate with your team,
                        organize projects, schedule meetings effortlessly all from one modern workspace.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <button className="px-5 py-3 gap-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground hover:text-primary transition-colors hover:border hover:border-primary duration-300 cursor-pointer">Get Started</button>  
                        <button className="px-5 py-3 gap-4 bg-secondary text-primary rounded-lg font-medium hover:bg-secondary hover:text-primary transition-colors hover:border hover:border-primary duration-300 cursor-pointer">Try It Out</button>    
                    </div>
                </div>
                <div className="w-96 h-96 rounded-lg flex flex-col justify-center items-center mt-2 mb-3 border-2 border-border bg-primary/10">
                    <h2 className="text-xl font-bold text-primary/90">Dashboard Preview</h2>
                    <p className="text-lg text-primary/90">Coming Soon</p>
                </div>
            </div>
        </Section>
    )
}