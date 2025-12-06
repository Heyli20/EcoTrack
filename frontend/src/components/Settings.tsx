import React, { useState } from "react";
import Navbar from "./residents/nav/Navbar.tsx";
import Footer from "./residents/footer/Footer.tsx";
import { User, Lock, Shield, LogOut, Moon, Sun } from "lucide-react";

const SettingsPage: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState({
        paymentReminders: true,
        dailyExpenses: true,
        budgetAlerts: true,
    });

    return (
        <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-50 min-h-screen"}>
            <Navbar />
            {/*if admin => <adminNav>*/}

            <main className="flex-grow">
                <div className="p-6 mx-auto space-y-6 w-full max-w-[1400px]">
                    <h1 className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                        Settings
                    </h1>

                    {/* Appearance */}
                    <CardSection title="Appearance">
                        <ToggleItem
                            label="Dark Mode"
                            enabled={darkMode}
                            onToggle={() => setDarkMode(!darkMode)}
                            icon={darkMode ? <Moon size={20} /> : <Sun size={20} />}
                        />
                    </CardSection>

                    {/* Account */}
                    <CardSection title="Account">
                        <SettingItem icon={<User size={20} />} label="Edit Profile" />
                        <SettingItem icon={<Lock size={20} />} label="Change Password" />
                        <SettingItem icon={<Shield size={20} />} label="Privacy & Security" />
                    </CardSection>

                    {/* Notifications */}
                    <CardSection title="Notifications">
                        <ToggleItem
                            label="Payment Reminders"
                            enabled={notifications.paymentReminders}
                            onToggle={() =>
                                setNotifications({ ...notifications, paymentReminders: !notifications.paymentReminders })
                            }
                        />
                        <ToggleItem
                            label="Daily Expense Reminders"
                            enabled={notifications.dailyExpenses}
                            onToggle={() =>
                                setNotifications({ ...notifications, dailyExpenses: !notifications.dailyExpenses })
                            }
                        />
                        <ToggleItem
                            label="Budget Limit Alerts"
                            enabled={notifications.budgetAlerts}
                            onToggle={() =>
                                setNotifications({ ...notifications, budgetAlerts: !notifications.budgetAlerts })
                            }
                        />
                    </CardSection>

                    {/* Logout */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5">
                        <button className="flex items-center gap-3 text-red-600 font-medium hover:text-red-700">
                            <LogOut size={20} /> Log Out
                        </button>
                    </div>
                </div>
            </main>

            <Footer />

        </div>
    );
};

export default SettingsPage;

// --------------------- Helper Components ---------------------

const CardSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
        {children}
    </div>
);

const SettingItem = ({ icon, label }: { icon: any; label: string }) => (
    <div className="flex justify-between items-center py-2 cursor-pointer hover:bg-green-50 dark:hover:bg-gray-700 rounded-xl px-2 transition-all">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
            {icon} <span>{label}</span>
        </div>
    </div>
);

const ToggleItem = ({
                        label,
                        enabled,
                        onToggle,
                        icon,
                    }: {
    label: string;
    enabled: boolean;
    onToggle: () => void;
    icon?: React.ReactNode;
}) => (
    <div className="flex justify-between items-center py-2">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">{icon} {label}</div>
        <button
            onClick={onToggle}
            className={`w-14 h-7 flex items-center rounded-full transition-all ${enabled ? "bg-green-600" : "bg-gray-300"}`}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full transform transition-all ${
                    enabled ? "translate-x-7" : "translate-x-1"
                }`}
            />
        </button>
    </div>
);
