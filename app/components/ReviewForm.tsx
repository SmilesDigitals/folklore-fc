'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Star, AlertCircle, CheckCircle } from 'lucide-react';
import GoogleAuthButton from './GoogleAuthButton';

export default function ReviewForm({ productId, t }: { productId: string, t: any }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || rating === 0) return;

        setIsSubmitting(true);
        setMessage(null);

        const { error } = await supabase.from('reviews').insert({
            product_id: productId,
            user_id: user.id,
            rating: rating,
            comment: comment,
            user_name: user.user_metadata.full_name || 'Anonymous',
            status: 'pending' // Default is pending, but good to be explicit
        });

        setIsSubmitting(false);

        if (error) {
            setMessage({ type: 'error', text: 'Error submitting review. Please try again.' });
            console.error(error);
        } else {
            setMessage({ type: 'success', text: 'Thank you! Your review has been submitted for approval.' });
            setRating(0);
            setComment('');
        }
    };

    if (!user) {
        return (
            <div className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a] text-center">
                <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
                <p className="text-gray-400 mb-6">Please sign in to share your thoughts about this product.</p>
                <div className="flex justify-center">
                    <GoogleAuthButton t={t} />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a]">
            <h3 className="text-xl font-bold mb-6">Write a Review</h3>

            {message && (
                <div className={`p-4 rounded-xl mb-6 flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none transition-colors"
                            >
                                <Star
                                    size={24}
                                    className={`${(hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} transition-colors`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-medium mb-2">Review</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-4 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none resize-none min-h-[120px]"
                        placeholder="Tell us what you think about the product..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
