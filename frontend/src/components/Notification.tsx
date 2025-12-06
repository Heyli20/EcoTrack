import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const notifications = [
    { id: 1, title: "Payment Reminder", message: "Your payment for Plastic Waste is due tomorrow. Please pay to avoid delays." },
    { id: 2, title: "Collection Alert", message: "Polythene collection scheduled today at 3 PM. Make sure to have waste ready." },
];

const NotificationDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const notification = notifications.find(n => n.id === Number(id));

    if (!notification) return <p className="p-6">Notification not found.</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <button onClick={() => navigate(-1)} className="text-green-600 font-medium mb-4">← Back</button>
            <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">{notification.title}</h1>
                <p className="text-gray-700">{notification.message}</p>
            </div>
        </div>
    );
};

export default NotificationDetailPage;
