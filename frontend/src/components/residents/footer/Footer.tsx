import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-white/50 backdrop-blur-md text-gray-700 dark:text-gray-500 px-6 py-4 mt-8 shadow-inner rounded-t-2xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm">

                {/* Left side: copyright */}
                <p>© 2025 EcoCollect. All rights reserved.</p>

                {/* Right side: quick links */}
                <div className="flex gap-4">
                    <a href="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-green-600 transition-colors">Terms of Service</a>
                    <a href="/contact" className="hover:text-green-600 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
