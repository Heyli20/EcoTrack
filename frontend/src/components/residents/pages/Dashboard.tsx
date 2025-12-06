import React, { useState } from "react";
import WasteCollectionChart from "../WasteCollectionChart.tsx";
import Navbar from "../nav/Navbar.tsx";
import Footer from "../footer/Footer.tsx";
import { Calendar, Clock, DollarSign, Trash2, CheckCircle, CreditCard, CalendarDays} from "lucide-react";

const Dashboard: React.FC = () => {
    const [activeRange, setActiveRange] = useState("3 months");

    const items = [
        {
            icon: <Trash2 className="text-green-700" size={22} />,
            label: "Total Waste",
            value: "15.2 kg",
            trend: "up",
            color: "bg-green-100",
        },
        {
            icon: <Clock className="text-blue-600" size={22} />,
            label: "Last Collection",
            value: "2 days",
            trend: "down",
            color: "bg-blue-100",
        },
        {
            icon: <DollarSign className="text-green-600" size={22} />,
            label: "Balance",
            value: "$45.30",
            trend: "up",
            color: "bg-green-100",
        },
        {
            icon: <Calendar className="text-orange-500" size={22} />,
            label: "Next Collection",
            value: "Tomorrow",
            trend: "next",
            color: "bg-orange-100",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />

            <main className="flex-grow">
                <div className="flex flex-col lg:flex-row p-6 gap-6 space-y-6 w-full max-w-[1400px] mx-auto">
                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl ${item.color}`}>{item.icon}</div>
                                    <div>
                                        <p className="text-xs text-gray-500">{item.label}</p>
                                        <p className="font-semibold text-gray-800">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-6">
                        <section>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Good morning, Sathush!
                            </h1>
                            <p className="text-sm text-gray-500 mb-4">
                                Today is Monday, September 3, 2025
                            </p>

                            {/* Chart Section */}
                            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 overflow-x-auto">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 md:gap-0">
                                    <div>
                                        <h2 className="font-semibold text-gray-800 text-lg">
                                            Waste Collection Overview
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Monthly waste collection data
                                        </p>
                                    </div>

                                    {/* Range buttons */}
                                    <div className="flex gap-2 flex-wrap">
                                        {["3 months", "6 months", "1 year"].map((range) => (
                                            <button
                                                key={range}
                                                onClick={() => setActiveRange(range)}
                                                className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                                                    activeRange === range
                                                        ? "bg-gradient-to-r from-emerald-300 to-teal-500 text-white"
                                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                }`}
                                            >
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Chart */}
                                <WasteCollectionChart activeRange={activeRange} />
                            </div>
                        </section>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
                            <h2 className="font-semibold text-gray-800 mb-3">Recent Activity</h2>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-green-700">
                                        <CheckCircle size={16} /> <span>Waste collected</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">2 hours ago</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <CreditCard size={16} /> <span>Payment received</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">1 day ago</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-orange-500">
                                        <CalendarDays size={16} /> <span>Collection scheduled</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">2 days ago</span>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
                            <h2 className="font-semibold text-gray-800 mb-3">Quick Actions</h2>
                            <div className="space-y-3">
                                <button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                                    <CheckCircle size={16} /> Schedule Collection
                                </button>
                                <button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                                    <CreditCard size={16} /> Make Payment
                                </button>
                                <button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                                    <CalendarDays size={16} /> View Reports
                                </button>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
                            <h2 className="font-semibold text-gray-800 mb-3">Notifications</h2>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <div className="h-4 w-1 bg-green-600 rounded-full mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            Collection completed
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Your waste was collected successfully
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="h-4 w-1 bg-orange-500 rounded-full mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-800">Payment due soon</p>
                                        <p className="text-gray-500 text-xs">Payment due in 3 days</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="h-4 w-1 bg-blue-600 rounded-full mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            New feature available
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Check out our new recycling tracker
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />

        </div>
    );
};

export default Dashboard;
