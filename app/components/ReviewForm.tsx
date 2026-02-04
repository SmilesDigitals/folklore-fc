'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Star, AlertCircle, CheckCircle } from 'lucide-react';

export default function ReviewForm({ productId, t }: { productId: string, t: any }) {
    // Removed Auth Context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        if (rating === 0 || !name.trim()) return;

        setIsSubmitting(true);
        setMessage(null);

        // Insert review as Guest (user_id is null, name is provided manually)
        const { error } = await supabase.from('reviews').insert({
            product_id: productId,
            user_id: null, // Guest user
            rating: rating,
            comment: comment,
            user_name: name,
            user_email: email, // New field
            status: 'pending'
        });

        setIsSubmitting(false);

        if (error) {
            setMessage({ type: 'error', text: 'Error submitting review. Please try again.' });
            console.error(error);
        } else {
            setMessage({ type: 'success', text: 'Thank you! Your review has been submitted for approval.' });
            setRating(0);
            setComment('');
            setName('');
            setEmail('');
        }
    };

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
                    <label className="block text-gray-400 text-sm font-medium mb-2">Your Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-4 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-4 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                        placeholder="name@example.com"
                        required
                    />
                </div>

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
                    disabled={isSubmitting || rating === 0 || !name.trim() || !email.trim()}
                    className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
