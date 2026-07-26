export default function Footer() {
    return (
        <footer className="bg-background border-t border-border py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-8">
                <div className="text-center md:text-left">
                    <h3 className="text-3xl tracking-tight font-bold text-foreground mb-2 hover:text-primary">TM-Management</h3>
                    <p className="text-muted-foreground">
                        Modern workspace for organizations to manage projects, collaborate with teams and improve productivity.
                    </p>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-foreground mb-2 hover:text-primary">Quick Links</h3>
                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Home</a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Features</a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">How It Works</a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Reviews</a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Login</a>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-foreground mb-2 hover:text-primary">Product</h3>
                    <div className="flex space-y-2 flex-col">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Pricing</a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">FAQ</a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Request Demo</a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Support</a>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-foreground mb-2 hover:text-primary space-y-2">Contact Us</h3>
                    <div className="flex space-y-2 flex-col items-center md:items-start">
                        <p className="text-muted-foreground">Email: support@tm-management.com</p>
                        <p className="text-muted-foreground">Phone: +234 XXX XXX XXXX</p>
                        <p className="text-muted-foreground">Abuja, Nigeria</p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8">
                <p className="text-center text-muted-foreground mt-8">&copy; {new Date().getFullYear()} TM-Management. Built for modern organizations. All rights reserved.</p>
            </div>
        </footer>
    );
}