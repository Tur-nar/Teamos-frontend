import {howItWorks} from "@/data/howItWorks";

export default function HowItWorks() {
    return (
        <section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-8">
                <h2 className="text-3xl font-bold text-center text-cyan-500 py-4">How It Works</h2>
                <p className="text-lg text-gray-400 text-center mt-4">Everything you need to organize, collaborate and deliver projects successfully.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorks.map((step) => (
                        <div key={step.step} className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                {step.step}
                            </div>
                            <h3 className="text-xl font-bold mt-4">{step.title}</h3>
                            <p className="text-gray-400 mt-2">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}