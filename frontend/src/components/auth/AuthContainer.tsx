// components/AuthContainer.tsx
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPsw';

type AuthMode = 'login' | 'signup' | 'forgot-password';

const AuthContainer: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>('login');

    return (
        <div className="min-h-screen bg-gradient-to-br p-0 from-blue-50 to-indigo-100 flex items-center justify-center">
            {mode === 'login' && (
                <Login
                    onToggleMode={() => setMode('signup')}
                    onForgotPassword={() => setMode('forgot-password')}
                />
            )}

            {mode === 'signup' && (
                <Signup onToggleMode={() => setMode('login')} />
            )}

            {mode === 'forgot-password' && (
                <ForgotPassword onBackToLogin={() => setMode('login')} />
            )}
        </div>
    );
};

export default AuthContainer;