import React, { useState } from "react";
import Navbar from "../nav/Navbar.tsx";
import Footer from "../footer/Footer.tsx";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

const PaymentPage: React.FC = () => {
    const [statusType, setStatusType] = useState("all");

    const types = [
        { key: "all", label: "All Payments" },
        { key: "Paid", label: "Paid" },
        { key: "Pending", label: "Pending" },
        { key: "Failed", label: "Failed" },
    ];

    const statusColors: any = {
        Paid: "text-green-700 bg-green-100",
        Pending: "text-yellow-700 bg-yellow-100",
        Failed: "text-red-700 bg-red-100",
    };

    const payments = [
        { id: "P-001", item: "Plastic Waste", amount: 1200, date: "2025-01-12", status: "Paid" },
        { id: "P-002", item: "Food Waste", amount: 900, date: "2025-01-14", status: "Pending" },
        { id: "P-003", item: "Cardboard", amount: 1500, date: "2025-01-15", status: "Failed" },
        { id: "P-004", item: "Polythene", amount: 600, date: "2025-01-16", status: "Paid" },
        { id: "P-005", item: "Special Collection", amount: 2500, date: "2025-01-17", status: "Pending" },
    ];

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPayments = statusType === "all" ? payments : payments.filter(p => p.status === statusType);
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const paginatedPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
                <div className="p-6 mx-auto space-y-6 w-full max-w-[1400px]">

                    {/* Header with Make Payment Button */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                        <h1 className="text-3xl font-semibold text-gray-800">Payments</h1>

                        <div className="flex flex-col items-center px-4 py-3 md:mt-4">
                            <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-medium text-lg shadow transition-all">
                                <CreditCard size={22} />
                                Make a Payment
                            </button>

                            <p className="text-sm text-gray-600 mt-1 text-center">
                                ⚠️ Complete payment within <span className="font-semibold text-red-600">3 days</span> after collection
                            </p>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="shadow-md rounded-2xl bg-white p-5">
                        <div className="flex flex-wrap gap-3">
                            {types.map(t => (
                                <button
                                    key={t.key}
                                    onClick={() => { setStatusType(t.key); setCurrentPage(1); }}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium border transition-all duration-300
                                        ${statusType === t.key
                                        ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md scale-105 border-green-400"
                                        : "bg-white border-gray-300 text-gray-700 hover:bg-green-100"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Empty State */}
                    {filteredPayments.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl shadow">
                            <div className="text-5xl mb-4">💳</div>
                            <h2 className="text-xl font-semibold text-gray-700">No Payments Found</h2>
                            <p className="text-gray-500 mb-5">All your payment records will appear here.</p>
                        </div>
                    )}

                    {/* Table */}
                    {filteredPayments.length > 0 && (
                        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
                            <table className="min-w-full">
                                <thead>
                                <tr className="bg-green-50 text-gray-700 uppercase text-sm font-semibold">
                                    <th className="py-3 px-6 text-left">Payment ID</th>
                                    <th className="py-3 px-6 text-left">Collected Item</th>
                                    <th className="py-3 px-6 text-left">Amount (Rs.)</th>
                                    <th className="py-3 px-6 text-left">Payment Date</th>
                                    <th className="py-3 px-6 text-left">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedPayments.map((p, index) => (
                                    <tr key={index} className="border-b last:border-b-0 hover:bg-green-50 transition-all cursor-pointer">
                                        <td className="py-3 px-6">{p.id}</td>
                                        <td className="py-3 px-6">{p.item}</td>
                                        <td className="py-3 px-6 font-medium text-gray-800">Rs. {p.amount.toFixed(2)}</td>
                                        <td className="py-3 px-6">{p.date}</td>
                                        <td className="py-3 px-6">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[p.status]}`}>
                                                    {p.status === "Paid" && <CheckCircle size={16} />}
                                                    {p.status === "Pending" && <Clock size={16} />}
                                                    {p.status === "Failed" && <XCircle size={16} />}
                                                    {p.status}
                                                </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center pt-3">
                            <button onClick={prevPage} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg border shadow ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-green-100"}`}>Previous</button>
                            <p className="text-gray-600 font-medium">Page {currentPage} of {totalPages}</p>
                            <button onClick={nextPage} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg border shadow ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-green-100"}`}>Next</button>
                        </div>
                    )}

                </div>
            </main>

            <Footer />

        </div>
    );
};

export default PaymentPage;
