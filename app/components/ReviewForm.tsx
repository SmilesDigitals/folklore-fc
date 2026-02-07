'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Star, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ReviewForm({ productId, t }: { productId: string, t: any }) {
    const { user, openAuthModal } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Update state when user changes
    useEffect(() => {
        if (user) {
            setName(user.user_metadata.full_name || '');
            setEmail(user.email || '');
        }
    }, [user]);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Trim and lowercase for consistency
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail || !emailRegex.test(cleanEmail)) {
            console.error('Validation failed for email:', cleanEmail);
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        if (rating === 0 || !name.trim()) {
            setMessage({ type: 'error', text: 'Please provide a rating and your name.' });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            // Insert review as Guest
            const { error } = await supabase.from('reviews').insert({
                product_id: productId,
                user_id: null, // Guest user
                rating: rating,
                comment: comment,
                user_name: name,
                user_email: email,
                status: 'pending'
            });

            if (error) throw error;

            setMessage({ type: 'success', text: 'Thank you! Your review has been submitted for approval.' });
            // Reset form
            setRating(0);
            setComment('');
            setName('');
            setEmail('');

        } catch (error: any) {
            console.error('❌ Supabase Insert Error:', error);
            setMessage({
                type: 'error',
                text: error.message || 'Failed to submit review. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // If user is not logged in, show restricted access view
    if (!user) {
        return (
            <div className="bg-[#18181b] p-8 rounded-3xl border border-[#27272a] shadow-2xl text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-[#27272a] p-4 rounded-full">
                        <Lock size={32} className="text-gray-400" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Write a Review</h3>
                <p className="text-gray-400 mb-6 text-sm max-w-md mx-auto">
                    Please sign in to share your experience with the community. Verified purchases help us improve.
                </p>

                <div className="flex flex-col gap-3 justify-center items-center">
                    <button
                        onClick={() => openAuthModal()}
                        className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-emerald-500 hover:text-white transition-all w-full max-w-xs"
                    >
                        Sign In to Review
                    </button>
                    <p className="text-xs text-gray-500">
                        It only takes a moment!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#18181b] p-8 rounded-3xl border border-[#27272a] shadow-2xl">
            <h3 className="text-2xl font-bold mb-2 text-white">Write a Review</h3>
            <p className="text-gray-400 mb-8 text-sm">Share your experience with the community.</p>

            {message && (
                <div className={`p-4 rounded-xl mb-8 flex items-start gap-3 backdrop-blur-md ${message.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {message.type === 'success' ? <CheckCircle size={20} className="shrink-0 mt-0.5" /> : <AlertCircle size={20} className="shrink-0 mt-0.5" />}
                    <span className="text-sm font-medium">{message.text}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-3.5 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none text-sm"
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Email</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-3.5 text-white placeholder-gray-600 opacity-50 cursor-not-allowed outline-none text-sm"
                            placeholder={user?.email || "your@email.com"}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                            >
                                <Star
                                    size={28}
                                    className={`${(hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-[#27272a]'} transition-colors duration-200`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Your Review</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-4 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none resize-none min-h-[140px] text-sm leading-relaxed"
                        placeholder="What did you like or dislike? How was the quality?"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-200 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Submitting...
                        </span>
                    ) : 'Submit Verified Review'}
                </button>
            </form>
        </div>
    );
}
