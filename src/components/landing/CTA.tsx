export default function CTA() {
    return (
        <section className="w-full py-16 bg-cyan-500">
            <div className="max-w-7xl mx-auto px-8 text-center">
                <h2 className="text-3xl font-bold text-white py-4">Ready to build a more productive team?</h2>
                <p className="text-lg text-gray-200 mt-4">Create your organization, invite your team, manage projects, track progress, and collaborate from one modern workspace. Join hundreds of teams simplifying work with TM-Management.</p>
                <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto">
                    <button className="inline-block bg-white text-cyan-500 font-bold mx-3 py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors translate-y-1 duration-300">
                        Create Workspace
                    </button>
                    <button className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-white hover:text-cyan-500 transition-colors translate-y-1 scale-105 duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
}