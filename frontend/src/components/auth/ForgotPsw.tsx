// components/ForgotPassword.tsx
import React, {useEffect, useState} from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Mail, ArrowBigLeft } from "lucide-react";
import logo from "../../assets/logo.png";

interface ForgotPasswordProps {
    onBackToLogin: () => void;
}

const ForgotPsw: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { forgotPassword, isLoading, error } = useAuth();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await forgotPassword(email);

        if (result.success) {
            setMessage('✅ Check your email for reset instructions');
        } else {
            setMessage('');
        }
    };

    return (

        <div
            className="h-screen w-screen p-0 flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://i.pinimg.com/736x/d9/38/81/d9388133272f411473c777f28a4017bf.jpg')",
            }}
        >
            <div className="bg-white/40 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/20">
                <div className="flex justify-center mb-4">
                    <img
                        src={logo}
                        alt="EcoTrack Logo"
                        className="w-28 h-28 object-contain drop-shadow-lg"
                    />
                </div>
                <h2 className="text-3xl font-bold text-center text-green-700 mb-2 drop-shadow">
                    Forgot Password?
                </h2>
                <p className="text-center text-gray-700 mb-6">
                    No worries, we’ll send you a reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-800 mb-1 block">
                            Email Address
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-green-600 shadow-sm">
                            <Mail className="text-green-700 w-5 h-5" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                placeholder="Enter your email"
                                className="w-full ml-2 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                            You'll receive a password reset link if your account exists.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
                            ⚠️ {error}
                        </div>
                    )}

                    {message && (
                        <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg border border-green-200">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
                    >
                        {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-700 text-sm">
                    <button
                        onClick={onBackToLogin}
                        className="flex items-center justify-center gap-2 text-green-700 text-base font-semibold hover:underline mx-auto hover:gap-3 transition-all duration-200"
                    >
                        <ArrowBigLeft className="w-7 h-7" />
                        Back to Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPsw;
