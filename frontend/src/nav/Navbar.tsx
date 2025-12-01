import React, { useState, useRef, useEffect } from "react";
import logo from '../assets/logo.png';
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
    const menuRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Waste History", path: "/waste-history" },
        { label: "Collections", path: "/collections" },
        { label: "Payments", path: "/payments" },
    ];

    // Example notifications
    const notifications: Notification[] = [
        { id: "N-001", title: "Payment Due: Plastic Waste", path: "/notification/N-001" },
        { id: "N-002", title: "New Collection Scheduled", path: "/notification/N-002" },
    ];

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white/40 backdrop-blur-lg text-black px-6 py-3 flex justify-between items-center shadow relative">
            {/* Left Section */}
            <div className="flex items-center space-x-10">
                <div className="flex items-center font-bold text-lg space-x-4 ml-4">
                    <img src={logo} alt="logo" className="w-14 h-14" />
                </div>

                <ul className="flex space-x-10 text-sm">
                    {menuItems.map(({ label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <li key={label} className="px-3 py-1 cursor-pointer relative transition-all duration-300">
                                <Link to={path} className="relative">
                                    {label}
                                    <span
                                        className={`
                                            absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r 
                                            from-green-500 to-green-700 transition-all duration-300
                                            ${isActive ? "scale-x-100" : "scale-x-0"} origin-left translate-y-1
                                        `}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4 relative" ref={menuRef}>

                {/* Notifications */}
                <div className="relative">
                    <button
                        className="cursor-pointer"
                        onClick={() => {
                            setShowNotifications((prev) => !prev);
                            setOpenMenu(false);
                        }}
                    >
                        <span className="text-xl">🔔</span>
                        <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-1 rounded-full">
                {notifications.length}
            </span>
                    </button>

                    {showNotifications && (
                        <div
                            className={`absolute right-0 mt-2 w-64 bg-stone-100
                            shadow-lg rounded-xl py-2 border border-white/40 z-50
                            ${notifications.length > 5 ? "max-h-60 overflow-y-auto" : ""}`}
                        >
                            {notifications.map((n) => (
                                <button
                                    key={n.id}
                                    onClick={() => {
                                        navigate(n.path);
                                        setShowNotifications(false);
                                    }}
                                    className="w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-white/40 hover:backdrop-blur-xl"
                                >
                                    {n.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="profile"
                        className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                        onClick={() => {
                            setOpenMenu((prev) => !prev);
                            setShowNotifications(false);
                        }}
                    />

                    {openMenu && (
                        <div
                            className="absolute right-0 mt-2 w-44 bg-stone-100 shadow-lg rounded-xl py-2
                            text-sm border border-white/40 z-50"
                        >
                            <button
                                onClick={() => navigate("/settings")}
                                className="w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-white/40 hover:backdrop-blur-xl"
                            >
                                Settings
                            </button>

                            <button
                                onClick={() => navigate("/profile")}
                                className="w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-white/40 hover:backdrop-blur-xl"
                            >
                                Profile
                            </button>

                            <button
                                className="w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-white/40 hover:backdrop-blur-xl"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
