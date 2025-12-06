import React, {useEffect, useState} from "react";
import { useAuth } from "../residents/hooks/useAuth";
import { toast } from "react-toastify";
import { Mail, Lock, User} from "lucide-react";
import logo from "../../assets/logo.png";

interface SignupProps {
    onToggleMode: () => void;
}

const Signup: React.FC<SignupProps> = ({ onToggleMode }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signup, isLoading, error } = useAuth();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const evaluatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length > 6) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return strength;
    };

    const getStrengthLabel = (strength: number) => {
        if (strength <= 1) return "Weak";
        if (strength === 2) return "Medium";
        return "Strong";
    };

    const getStrengthColor = (strength: number) => {
        if (strength <= 1) return "bg-red-500";
        if (strength === 2) return "bg-yellow-500";
        return "bg-green-600";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            toast.error("❌ Passwords do not match!", { className: "bg-red-600 text-white" });
            return;
        }
        const result = await signup(formData.email, formData.password, formData.name);
        if (result.success) toast.success("✅ Account created successfully!");
    };

    return (
        <div
            className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-0"
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
                            className="w-20 h-20 object-contain"
                        />
                </div>

                <h2 className="text-3xl font-bold text-center text-green-700 mb-2 drop-shadow">
                    Create Account
                </h2>
                <p className="text-center text-gray-700 mb-6">Join us today to get started!</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-800">Full Name</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-green-600 shadow-sm">
                            <User className="text-green-700 w-5 h-5" />
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full ml-2 bg-transparent outline-none text-gray-800"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-800">Email Address</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-green-600 shadow-sm">
                            <Mail className="text-green-700 w-5 h-5" />
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full ml-2 bg-transparent outline-none text-gray-800"
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
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full ml-2 bg-transparent outline-none text-gray-800"
                                required
                            />
                        </div>

                        {/* Strength Meter */}
                        {formData.password.length > 0 && (
                            <div className="mt-2">
                                <div className="bg-gray-300 h-2 rounded">
                                    <div
                                        className={`h-2 rounded ${getStrengthColor(
                                            evaluatePasswordStrength(formData.password)
                                        )}`}
                                        style={{
                                            width: `${(evaluatePasswordStrength(formData.password) / 3) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className="text-sm mt-1 text-gray-600">
                                    Strength:{" "}
                                    <b>{getStrengthLabel(evaluatePasswordStrength(formData.password))}</b>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm text-gray-800">Confirm Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-green-600 shadow-sm">
                            <Lock className="text-green-700 w-5 h-5" />
                            <input
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="w-full ml-2 bg-transparent outline-none text-gray-800"
                                required
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-700">
                    Already have an account?{" "}
                    <button onClick={onToggleMode} className="text-green-700 font-semibold hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
