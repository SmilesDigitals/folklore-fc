'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { Check, X, ShieldAlert, Loader2, Star } from 'lucide-react';
import Link from 'next/link';

type Review = {
    id: string;
    user_name: string;
    product_id: string;
    rating: number;
    comment: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
};

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Simple client-side protection for now (Production should use Middleware/RLS roles)
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Di258940620.') { // Temporary simple password
            setIsAuthenticated(true);
            fetchReviews();
        } else {
            alert('Incorrect Password');
        }
    };

    const fetchReviews = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching reviews:', error);
        else setReviews(data || []);
        setLoading(false);
    };

    const updateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
        setActionLoading(id);
        const { error } = await supabase
            .from('reviews')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } else {
            // Update local state
            setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
        }
        setActionLoading(null);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white px-4">
                <form onSubmit={handleLogin} className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a] w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <ShieldAlert size={48} className="text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-emerald-500"
                    />
                    <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const otherReviews = reviews.filter(r => r.status !== 'pending');

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-black uppercase">Review Moderation</h1>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white">Back to Home</Link>
                </div>

                {/* Pending Reviews Section */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                        <Loader2 className="animate-spin" size={20} /> Pending Approval ({pendingReviews.length})
                    </h2>

                    {loading ? (
                        <div className="text-gray-500">Loading...</div>
                    ) : pendingReviews.length === 0 ? (
                        <div className="bg-[#18181b] p-6 rounded-xl border border-[#27272a] text-gray-500 italic">
                            No pending reviews. Good job!
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {pendingReviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    onApprove={() => updateStatus(review.id, 'approved')}
                                    onReject={() => updateStatus(review.id, 'rejected')}
                                    loading={actionLoading === review.id}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* History Section */}
                <section>
                    <h2 className="text-xl font-bold text-gray-400 mb-6">History ({otherReviews.length})</h2>
                    <div className="grid gap-4 opacity-60 hover:opacity-100 transition-opacity">
                        {otherReviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onApprove={() => updateStatus(review.id, 'approved')}
                                onReject={() => updateStatus(review.id, 'rejected')}
                                loading={actionLoading === review.id}
                                isHistory
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

function ReviewCard({ review, onApprove, onReject, loading, isHistory = false }: any) {
    return (
        <div className={`bg-[#18181b] p-6 rounded-xl border ${review.status === 'rejected' ? 'border-red-900/30' : 'border-[#27272a]'} flex flex-col md:flex-row gap-6 items-start md:items-center justify-between`}>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${review.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                        review.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                            'bg-yellow-500/10 text-yellow-500'
                        }`}>
                        {review.status}
                    </span>
                    <span className="text-sm font-bold">{review.user_name}</span>
                    <span className="text-xs text-gray-500">on Product ID: {review.product_id}</span>
                </div>

                <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-700"} />
                    ))}
                </div>

                <p className="text-gray-300">{review.comment}</p>
                <div className="text-xs text-gray-600 mt-2">{new Date(review.created_at).toLocaleString()}</div>
            </div>

            <div className="flex items-center gap-3">
                {loading ? (
                    <Loader2 className="animate-spin text-gray-500" />
                ) : (
                    <>
                        {review.status !== 'approved' && (
                            <button onClick={onApprove} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                                <Check size={16} /> Approve
                            </button>
                        )}
                        {review.status !== 'rejected' && (
                            <button onClick={onReject} className="flex items-center gap-2 bg-[#27272a] hover:bg-red-900/50 text-gray-400 hover:text-red-400 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                                <X size={16} /> Reject
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
