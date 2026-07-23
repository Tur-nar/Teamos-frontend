export default function Hero() {
    return (
        <section className="w-full flex justify-between items-center px-8 min-h-[80vh] max-w-7xl mx-auto">
            <div className="max-w-xl">
                <h1 className="text-5xl font-bold leading-tight">Build, Collaborate and Manage Your Team&apos;s Work in One Workspace.</h1>
                <p className="text-lg text-gray-400 mt-6 leading-8">
                    Manage your tasks, collaborate with your team,
                    organize projects, schedule meetings effortlessly all from one modern workspace.
                </p>
                <div className="flex gap-4 mt-6">
                    <button className="px-5 py-3 gap-4 text-white rounded-lg font-medium hover:bg-cyan-600">Get Started</button>  
                    <button className="px-5 py-3 gap-4 text-white rounded-lg font-medium hover:bg-cyan-600">Try It Out</button>    
                </div>
            </div>
            <div className="w-96 h-96 bg-cyan-500 rounded-xl flex flex-col justify-center items-center mt-2 mb-3">
                <h2 className="text-xl font-bold">Dashboard Preview</h2>
                <p>Coming Soon</p>
            </div>
        </section>
    )
}