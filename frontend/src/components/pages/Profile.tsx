import React from "react";
import Navbar from "../../nav/Navbar";
import Footer from "../../footer/Footer.tsx";
import { Mail, Phone, LogOut } from "lucide-react";

const ProfilePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
                <div className="p-6 mx-auto space-y-6 w-full max-w-[1400px]">

                    {/* Header */}
                    <h1 className="text-3xl font-semibold text-gray-800">Profile</h1>

                    {/* Profile Card */}
                    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center space-y-4">
                        {/* Profile Picture */}
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* User Info */}
                        <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
                        <p className="text-gray-500">@johndoe</p>

                        {/* Contact Info */}
                        <div className="w-full mt-4 space-y-2">
                            <InfoItem icon={<Mail size={20} />} label="Email" value="john.doe@example.com" />
                            <InfoItem icon={<Phone size={20} />} label="Phone" value="+94 77 123 4567" />
                        </div>

                        {/* Account Actions */}
                        <div className="w-full mt-6 flex flex-col gap-3">
                            <button className="flex items-center gap-3 justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-medium shadow transition-all">
                                Edit Profile
                            </button>
                            <button className="flex items-center gap-3 justify-center px-6 py-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-medium shadow transition-all">
                                <LogOut size={20} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

        </div>
    );
};

export default ProfilePage;

// ------------------- Helper Component -------------------

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
        {icon}
        <div className="flex flex-col">
            <span className="text-sm font-medium">{label}</span>
            <span className="text-gray-500">{value}</span>
        </div>
    </div>
);
