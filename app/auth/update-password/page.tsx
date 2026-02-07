'use client';

import { useState, Suspense } from 'react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Loader, CheckCircle, AlertCircle } from 'lucide-react';

function UpdatePasswordContent() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setMessage({ type: 'success', text: 'Password updated successfully! Redirecting...' });

            setTimeout(() => {
                router.push('/');
            }, 3000);

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#18181b] border border-[#27272a] rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-[#27272a] rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-emerald-500" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Set New Password</h1>
                    <p className="text-gray-400 text-sm">
                        Please enter your new password below.
                    </p>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 backdrop-blur-md ${message.type === 'success'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                        {message.type === 'success' ? <CheckCircle size={20} className="shrink-0 mt-0.5" /> : <AlertCircle size={20} className="shrink-0 mt-0.5" />}
                        <span className="text-sm font-medium">{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl py-3 pl-10 pr-12 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-500 transition-colors flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function UpdatePasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">Loading...</div>}>
            <UpdatePasswordContent />
        </Suspense>
    );
}
