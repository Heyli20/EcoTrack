import { useState } from 'react';

interface User{
    email: string;
    name: string;
}

interface AuthState{
    user: User | null;
    isLoading: boolean;
    error: string;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isLoading: false,
        error: ''
    });

    const login = async (email:string,password:string) => {
        setAuthState(prev => ({ ...prev,isLoading: true,error:''}));
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        try{
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!emailPattern.test(email)) {
                throw new Error('Invalid email format');
            }

            if (email === 'user@example.com' && password === 'password') {
                const user = { email, name: 'John Doe' };
                setAuthState({ user, isLoading: false, error: '' });
                return { success: true };
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            setAuthState(prev => ({ ...prev, error: message, isLoading: false }));
            return { success: false, error: message };
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        setAuthState(prev => ({ ...prev, isLoading: true, error: '' }));

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const user = { email, name };
            console.log(password);
            setAuthState({ user, isLoading: false, error: '' });
            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Signup failed';
            setAuthState(prev => ({ ...prev, error: message, isLoading: false }));
            return { success: false, error: message };
        }
    };

    const forgotPassword = async (email: string) => {
        setAuthState(prev => ({ ...prev, isLoading: true, error: '' }));

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(email);
            return { success: true, message: 'Password reset email sent' };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to send reset email';
            setAuthState(prev => ({ ...prev, error: message, isLoading: false }));
            return { success: false, error: message };
        }
    };

    const logout = () => {
        setAuthState({ user: null, isLoading: false, error: '' });
    };

    return {
        user: authState.user,
        isLoading: authState.isLoading,
        error: authState.error,
        login,
        signup,
        forgotPassword,
        logout
    };
};