import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Notification {
    id: string;
    title: string;
    path: string;
}

const AdminNavbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Users", path: "/admin/users" },
        { label: "Requests", path: "/admin/requests" },
        { label: "Trucks", path: "/admin/trucks" },
        { label: "Analysis", path: "/admin/analysis" },
        { label: "Payments", path: "/admin/payments" },
        { label: "Complains", path: "/admin/complains" },
    ];

    const notifications: Notification[] = [
        { id: "N-001", title: "New user registered", path: "/admin/notification/N-001" },
        { id: "N-002", title: "New truck assigned", path: "/admin/notification/N-002" },
    ];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavigate = (path: string) => {
        navigate(path);
        setShowNotifications(false);
        setProfileOpen(false);
        setOpenMenu(false);
    };

    return (
        <>
            {/* Header */}
            <nav className="bg-gray-50/70 backdrop-blur-lg px-6 py-3 flex justify-between items-center shadow relative">
                <div className="flex items-center space-x-6">
                    {/* Logo */}
                    <div className="text-xl font-bold text-green-600">Admin Panel</div>

                    {/* Desktop menu */}
                    <ul className="hidden md:flex space-x-8 text-sm font-medium">
                        {menuItems.map(({ label, path }) => {
                            const isActive = location.pathname === path;
                            return (
                                <li key={label} className="relative cursor-pointer">
                                    <Link
                                        to={path}
                                        className={`px-2 py-1 ${
                                            isActive
                                                ? "text-green-700 font-semibold"
                                                : "text-gray-700 hover:text-green-600"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded" />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-4 relative" ref={menuRef}>
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            className="cursor-pointer text-xl"
                            onClick={() => {
                                setShowNotifications(prev => !prev);
                                setProfileOpen(false);
                            }}
                        >
                            🔔
                            <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-1 rounded-full">
                                {notifications.length}
                            </span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl py-2 border border-gray-200 z-50">
                                {notifications.map(n => (
                                    <div
                                        key={n.id}
                                        onClick={() => handleNavigate(n.path)}
                                        className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        {n.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="profile"
                            className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                            onClick={e => {
                                e.stopPropagation();
                                setProfileOpen(prev => !prev);
                                setShowNotifications(false);
                            }}
                        />
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl py-2 text-sm border border-gray-200 z-50">
                                <div
                                    onClick={() => handleNavigate("/profile")}
                                    className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100"
                                >
                                    Profile
                                </div>
                                <div
                                    onClick={() => handleNavigate("/settings")}
                                    className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100"
                                >
                                    Settings
                                </div>
                                <div
                                    onClick={() => handleNavigate("/logout")}
                                    className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100"
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Hamburger below header */}
            <div className="md:hidden flex justify-start px-6 mt-2">
                <button
                    onClick={() => setOpenMenu(prev => !prev)}
                    className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg shadow text-3xl"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Slide Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${
                    openMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setOpenMenu(false)}
            />

            {/* Mobile Slide Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform ${
                    openMenu ? "translate-x-0" : "-translate-x-full"
                }`}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-5 flex justify-between items-center border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={() => setOpenMenu(false)} className="text-2xl">×</button>
                </div>
                <div className="p-4 space-y-3">
                    {menuItems.map(({ label, path }) => (
                        <div
                            key={label}
                            onClick={() => handleNavigate(path)}
                            className="cursor-pointer w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminNavbar;