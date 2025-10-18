import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";
import logo from "../../assets/logo.png";

interface LoginProps {
    onToggleMode: () => void;
    onForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onToggleMode, onForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useAuth();
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const savedEmail = localStorage.getItem("rememberEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rememberMe) {
            localStorage.setItem("rememberEmail", email);
        } else {
            localStorage.removeItem("rememberEmail");
        }

        const result = await login(email, password);

        if (result.success) {
            toast.success("✅ Login successful!");
        } else {
            toast.error(result.error || "❌ Login failed");
        }
    };

    return (
        <div
            className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-0"
            style={{
                backgroundImage:
                    "url('https://i.pinimg.com/736x/d9/38/81/d9388133272f411473c777f28a4017bf.jpg')",
            }}
        >
            <div className="bg-white/40 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/20">

                {/* ✅ App Logo */}
                <div className="flex justify-center mb-4">
                    <img
                        src={logo}
                        alt="EcoTrack Logo"
                        className="w-28 h-28 object-contain drop-shadow-lg"
                    />
                </div>

                <h2 className="text-3xl font-bold text-center text-green-700 mb-2 drop-shadow">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-700 mb-6">
                    Please sign in to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-800">Email Address</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-green-600 shadow-sm">
                            <Mail className="text-green-700 w-5 h-5" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="w-full ml-2 bg-transparent outline-none text-gray-800"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-800">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-green-600 shadow-sm">
                            <Lock className="text-green-700 w-5 h-5" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full ml-2 bg-transparent outline-none text-gray-800"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-gray-700">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-green-600"
                            />
                            <span className="text-sm">Remember me</span>
                        </label>

                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="text-sm font-semibold text-green-700 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="text-sm text-red-600 bg-red-100 p-2 rounded">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Sign In */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Toggle Signup */}
                <p className="mt-4 text-center text-gray-700">
                    Don't have an account?{" "}
                    <button
                        onClick={onToggleMode}
                        className="text-green-700 font-semibold hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
