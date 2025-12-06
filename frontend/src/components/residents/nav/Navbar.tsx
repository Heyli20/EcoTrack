import React, { useState, useRef, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Notification {
    id: string;
    title: string;
    path: string;
}

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Waste History", path: "/waste-history" },
        { label: "Collections", path: "/collections" },
        { label: "Payments", path: "/payments" },
    ];

    const notifications: Notification[] = [
        { id: "N-001", title: "Payment Due: Plastic Waste", path: "/notification/N-001" },
        { id: "N-002", title: "New Collection Scheduled", path: "/notification/N-002" },
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
            <nav className="bg-white/40 backdrop-blur-lg text-black px-6 py-3 flex justify-between items-center shadow relative">
                <div className="flex items-center space-x-6">
                    {/* Logo */}
                    <img src={logo} alt="logo" className="w-12 h-12" />

                    {/* Desktop menu */}
                    <ul className="hidden md:flex space-x-10 text-sm">
                        {menuItems.map(({ label, path }) => {
                            const isActive = location.pathname === path;
                            return (
                                <li key={label} className="px-3 py-1 cursor-pointer relative">
                                    <Link to={path} className="relative">
                                        {label}
                                        <span
                                            className={`absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-green-500 to-green-700 transition-all origin-left translate-y-1 ${
                                                isActive ? "scale-x-100" : "scale-x-0"
                                            }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Right icons */}
                <div className="flex items-center space-x-4 relative" ref={menuRef}>
                    {/* Notification icon */}
                    <div className="relative">
                        <button
                            className="cursor-pointer"
                            onClick={() => {
                                setShowNotifications(prev => !prev);
                                setProfileOpen(false);
                            }}
                        >
                            <span className="text-xl">🔔</span>
                            <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-1 rounded-full">
                                {notifications.length}
                            </span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-64 bg-stone-100 shadow-lg rounded-xl py-2 border border-white/40 z-50">
                                {notifications.map(n => (
                                    <div
                                        key={n.id}
                                        onClick={() => handleNavigate(n.path)}
                                        className="cursor-pointer w-full text-left px-4 py-2 rounded-lg hover:bg-white/40"
                                    >
                                        {n.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Profile icon */}
                    <div className="relative">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="profile"
                            className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                            onClick={e => {
                                e.stopPropagation();
                                setProfileOpen(prev => !prev);
                                setShowNotifications(false);
                            }}
                        />
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-stone-100 shadow-lg rounded-xl py-2 text-sm border border-white/40 z-50">
                                <div
                                    onClick={() => handleNavigate("/settings")}
                                    className="cursor-pointer w-full px-4 py-2 hover:bg-white/40"
                                >
                                    Settings
                                </div>
                                <div
                                    onClick={() => handleNavigate("/profile")}
                                    className="cursor-pointer w-full px-4 py-2 hover:bg-white/40"
                                >
                                    Profile
                                </div>
                                <div
                                    onClick={() => handleNavigate("/logout")}
                                    className="cursor-pointer w-full px-4 py-2 hover:bg-white/40"
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Hamburger (separate square below logo) */}
            <div className="md:hidden flex justify-start px-6 mt-2">
                <button
                    onClick={() => setOpenMenu(prev => !prev)}
                    className="w-12 h-12 flex items-center justify-center bg-stone-200 rounded-lg shadow text-3xl"
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
                            className="cursor-pointer w-full text-left px-3 py-2 rounded hover:bg-stone-100"
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;