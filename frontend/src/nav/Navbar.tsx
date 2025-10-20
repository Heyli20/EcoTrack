import React, { useState } from "react";
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
    const [active, setActive] = useState("Dashboard");

    const menuItems = ["Dashboard", "Waste History", "Collections", "Payments", "Settings"];

    return (
        <nav className="bg-white/40 backdrop-blur-lg text-black px-6 py-3 flex justify-between items-center shadow">
            {/* Left Section */}
            <div className="flex items-center space-x-10">
                {/* Logo */}
                <div className="flex items-center font-bold text-lg space-x-2">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-14 h-14"
                    />
                </div>

                {/* Menu Links */}
                <ul className="flex space-x-6 text-sm">
                    {menuItems.map((item) => (
                        <li
                            key={item}
                            onClick={() => setActive(item)}
                            className={`
                                px-3 py-1 cursor-pointer relative
                                transition-all duration-300
                            `}
                        >
                            {item}

                            {/* Underline */}
                            <span
                                className={`
                                    absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-green-500 to-green-700 
                                    transition-all duration-300
                                    ${active === item ? "scale-x-100" : "scale-x-0"}
                                    origin-left
                                `}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <div className="relative cursor-pointer">
                    <span className="text-xl">🔔</span>
                    <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-1 rounded-full">
                        2
                    </span>
                </div>
                {/* Profile Image */}
                <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="profile"
                    className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                />
            </div>
        </nav>
    );
};

export default Navbar;
