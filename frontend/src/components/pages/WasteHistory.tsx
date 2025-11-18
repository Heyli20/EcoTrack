import React, { useState } from "react";
import Navbar from "../../nav/Navbar.tsx";
import { Leaf, GlassWater, Recycle, Package, Star } from "lucide-react";

const WasteHistoryPage: React.FC = () => {
    const [garbageType, setGarbageType] = useState("all");

    const types = [
        { key: "all", label: "All", icon: <Leaf size={16} /> },
        { key: "food", label: "Food Waste", icon: <GlassWater size={16} /> },
        { key: "polythene", label: "Polythene", icon: <Recycle size={16} /> },
        { key: "cardboard", label: "Cardboard", icon: <Package size={16} /> },
        { key: "special", label: "Special Collection", icon: <Star size={16} /> }
    ];

    const wasteColors: any = {
        Plastic: "text-blue-600 bg-blue-100",
        "Food Waste": "text-green-700 bg-green-100",
        Cardboard: "text-orange-600 bg-orange-100",
        Polythene: "text-purple-600 bg-purple-100",
        Special: "text-yellow-600 bg-yellow-100"
    };

    // Added weight values
    const tableData = [
        { bin: "001", type: "Plastic", date: "2025-01-12", time: "08:30 AM", collector: "John Doe", weight: "1.2 kg" },
        { bin: "002", type: "Food Waste", date: "2025-01-12", time: "09:00 AM", collector: "Amara Perera", weight: "2.8 kg" },
        { bin: "003", type: "Cardboard", date: "2025-01-13", time: "10:15 AM", collector: "Saman Silva", weight: "3.5 kg" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Waste Collection History
                </h1>

                {/* Filter Buttons */}
                <div className="shadow-md rounded-2xl bg-white p-5">
                    <div className="flex flex-wrap gap-3">
                        {types.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setGarbageType(t.key)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium border transition-all duration-300
                                    ${
                                    garbageType === t.key
                                        ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md scale-105 border-green-400"
                                        : "bg-white border-gray-300 text-gray-700 hover:bg-green-100"
                                }
                                `}
                            >
                                {t.icon}
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* EMPTY STATE */}
                {tableData.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl shadow">
                        <div className="text-5xl mb-4">📄</div>
                        <h2 className="text-xl font-semibold text-gray-700">
                            No Waste Collection Records
                        </h2>
                        <p className="text-gray-500 mb-5">
                            You will see completed collection records here once collections are done.
                        </p>
                    </div>
                )}

                {/* Table */}
                {tableData.length > 0 &&(
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
                            <thead>
                            <tr className="bg-green-50 text-gray-700 uppercase text-sm font-semibold">
                                <th className="py-3 px-6 text-left">Bin Number</th>
                                <th className="py-3 px-6 text-left">Waste Type</th>
                                <th className="py-3 px-6 text-left">Collected Date</th>
                                <th className="py-3 px-6 text-left">Time</th>
                                <th className="py-3 px-6 text-left">Collector Name</th>
                                <th className="py-3 px-6 text-left">Weight</th> {/* NEW COLUMN */}
                            </tr>
                            </thead>

                            <tbody>
                            {tableData
                                .filter(row => garbageType === "all" || row.type.toLowerCase().includes(garbageType))
                                .map((row, index) => (
                                    <tr
                                        key={index}
                                        className="border-b last:border-b-0 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                                    >
                                        <td className="py-3 px-6">{row.bin}</td>

                                        {/* Waste Type with Icon Badge */}
                                        <td className="py-3 px-6">
                                            <span
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${wasteColors[row.type]}`}
                                            >
                                                ● {row.type}
                                            </span>
                                        </td>

                                        <td className="py-3 px-6">{row.date}</td>
                                        <td className="py-3 px-6">{row.time}</td>
                                        <td className="py-3 px-6">{row.collector}</td>

                                        {/* NEW WEIGHT COLUMN */}
                                        <td className="py-3 px-6 font-medium text-gray-800">{row.weight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WasteHistoryPage;
