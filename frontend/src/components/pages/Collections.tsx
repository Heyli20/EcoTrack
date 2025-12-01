import React, { useState } from "react";
import Navbar from "../../nav/Navbar";
import Footer from "../../footer/Footer.tsx";
import { MapPin, Clock, Plus, Pencil, Trash2, Search } from "lucide-react";

const CollectionsPage: React.FC = () => {
    const [pendingRequests, setPendingRequests] = useState([
        {
            bin: "001",
            type: "Food Waste",
            date: "2025-01-15",
            time: "09:00 AM",
            location: "Colombo 05",
            status: "Pending"
        },
        {
            bin: "014",
            type: "Plastic",
            date: "2025-01-16",
            time: "11:30 AM",
            location: "Maharagama",
            status: "Pending"
        },
        {
            bin: "023",
            type: "Cardboard",
            date: "2025-01-17",
            time: "01:45 PM",
            location: "Nugegoda",
            status: "Pending"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const wasteColors: any = {
        Plastic: "text-blue-600 bg-blue-100",
        "Food Waste": "text-green-700 bg-green-100",
        Cardboard: "text-orange-600 bg-orange-100",
        Polythene: "text-purple-600 bg-purple-100",
        Special: "text-yellow-600 bg-yellow-100"
    };

    const statusColors: any = {
        Pending: "text-yellow-700 bg-yellow-100",
        Scheduled: "text-green-700 bg-green-100",
        Cancelled: "text-red-700 bg-red-100"
    };

    // ---------------- FILTER + PAGINATION ----------------
    const filteredData = pendingRequests.filter((req) =>
        req.bin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = filteredData.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    // ---------------- DELETE ROW ----------------
    const handleDelete = (bin: string) => {
        const updated = pendingRequests.filter((req) => req.bin !== bin);
        setPendingRequests(updated);
    };

    // ---------------- EDIT ----------------
    const handleEdit = (bin: string) => {
        alert("Edit clicked for bin " + bin);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
                <div className="p-6 mx-auto space-y-6 w-full max-w-[1400px]">

                    {/* Title + Button */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold text-gray-800">Pending Collections</h1>

                        <button
                            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all"
                        >
                            <Plus size={18} />
                            Schedule Collection
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-3 w-full md:w-1/3 bg-white px-4 py-2 rounded-xl shadow">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by bin, type or location"
                            className="w-full outline-none"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>

                    {/* EMPTY STATE */}
                    {filteredData.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl shadow">
                            <div className="text-5xl mb-4">🗑️</div>
                            <h2 className="text-xl font-semibold text-gray-700">
                                No Pending Requests Found
                            </h2>
                            <p className="text-gray-500 mb-5">
                                Try adjusting your search or schedule a new collection.
                            </p>
                            <button className="bg-green-600 text-white px-5 py-2 rounded-xl shadow">
                                Schedule Collection
                            </button>
                        </div>
                    )}

                    {/* TABLE */}
                    {filteredData.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
                                <thead>
                                <tr className="bg-green-50 text-gray-700 uppercase text-sm font-semibold">
                                    <th className="py-3 px-6 text-left">Bin Number</th>
                                    <th className="py-3 px-12 text-left">Bin Type</th>
                                    <th className="py-3 px-6 text-left">Requested Date</th>
                                    <th className="py-3 px-12 text-left">Time</th>
                                    <th className="py-3 px-10 text-left">Location</th>
                                    <th className="py-3 px-6 text-left">Status</th>
                                    <th className="py-3 px-6 text-left"></th>
                                </tr>
                                </thead>

                                <tbody>
                                {paginatedData.map((req, i) => (
                                    <tr
                                        key={i}
                                        className="border-b last:border-b-0 hover:bg-green-50 transition-all"
                                    >
                                        <td className="py-3 px-10">{req.bin}</td>

                                        {/* BIN TYPE */}
                                        <td className="py-3 px-6">
                                            <span
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${wasteColors[req.type]}`}
                                            >
                                                ● {req.type}
                                            </span>
                                        </td>

                                        <td className="py-3 px-6">{req.date}</td>

                                        {/* TIME */}
                                        <td className="py-3 px-6">
                                            <Clock size={16} className="inline-block mr-2 text-gray-600" />
                                            {req.time}
                                        </td>

                                        {/* LOCATION */}
                                        <td className="py-3 px-6">
                                            <MapPin size={16} className="inline-block mr-2 text-green-600" />
                                            {req.location}
                                        </td>

                                        {/* STATUS */}
                                        <td className="py-3 px-6">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[req.status]}`}
                                            >
                                                {req.status}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="py-3 px-6 flex gap-5">
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => handleEdit(req.bin)}
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(req.bin)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* PAGINATION */}
                    {filteredData.length > 0 && (
                        <div className="flex justify-between items-center pt-4">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className={`px-4 py-2 rounded-lg ${
                                    page === 1 ? "bg-gray-200 text-gray-400" : "bg-green-600 text-white"
                                }`}
                            >
                                Previous
                            </button>

                            <span className="text-gray-600 font-medium">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className={`px-4 py-2 rounded-lg ${
                                    page === totalPages
                                        ? "bg-gray-200 text-gray-400"
                                        : "bg-green-600 text-white"
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

        </div>
    );
};

export default CollectionsPage;
