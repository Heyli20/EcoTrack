import React from "react";
import AdminNavbar from "../nav/AdminNav.tsx";

const AdminDash: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <AdminNavbar />

            {/* Main Content */}
            <div className="px-6 py-6">
                {/* Welcome Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin!</h1>
                    <p className="text-gray-600 mt-1">Here is the summary of your system.</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white shadow rounded-xl p-4">
                        <h2 className="text-gray-500 text-sm">Total Users</h2>
                        <p className="text-2xl font-bold text-green-600 mt-2">1,245</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4">
                        <h2 className="text-gray-500 text-sm">Pending Requests</h2>
                        <p className="text-2xl font-bold text-yellow-500 mt-2">57</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4">
                        <h2 className="text-gray-500 text-sm">Trucks</h2>
                        <p className="text-2xl font-bold text-blue-500 mt-2">23</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4">
                        <h2 className="text-gray-500 text-sm">Payments Today</h2>
                        <p className="text-2xl font-bold text-purple-600 mt-2">$12,400</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white shadow rounded-xl p-4 h-64 flex items-center justify-center">
                        <p className="text-gray-500">Analysis Chart Placeholder</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4 h-64 flex items-center justify-center">
                        <p className="text-gray-500">Payment Trend Chart Placeholder</p>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white shadow rounded-xl p-4">
                    <h2 className="text-gray-800 font-semibold mb-4">Recent Requests</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-2 text-gray-500 text-sm">ID</th>
                                <th className="px-4 py-2 text-gray-500 text-sm">User</th>
                                <th className="px-4 py-2 text-gray-500 text-sm">Request Type</th>
                                <th className="px-4 py-2 text-gray-500 text-sm">Status</th>
                                <th className="px-4 py-2 text-gray-500 text-sm">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2">R-001</td>
                                <td className="px-4 py-2">John Doe</td>
                                <td className="px-4 py-2">Pickup Request</td>
                                <td className="px-4 py-2 text-yellow-500">Pending</td>
                                <td className="px-4 py-2">2025-12-04</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2">R-002</td>
                                <td className="px-4 py-2">Jane Smith</td>
                                <td className="px-4 py-2">Complaint</td>
                                <td className="px-4 py-2 text-red-500">Resolved</td>
                                <td className="px-4 py-2">2025-12-03</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2">R-003</td>
                                <td className="px-4 py-2">Alice Brown</td>
                                <td className="px-4 py-2">Pickup Request</td>
                                <td className="px-4 py-2 text-green-500">Completed</td>
                                <td className="px-4 py-2">2025-12-02</td>
                            </tr>
                            {/* Add more rows dynamically */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDash;
