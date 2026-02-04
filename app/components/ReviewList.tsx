'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Star, User } from 'lucide-react';

type Review = {
    id: string;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
};

export default function ReviewList({ productId }: { productId: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('product_id', productId)
                .eq('status', 'approved')
                .order('created_at', { ascending: false });

            if (error) console.error('Error fetching reviews:', error);
            else setReviews(data || []);

            setLoading(false);
        };

        fetchReviews();
    }, [productId]);

    if (loading) return <div className="text-gray-500 animate-pulse">Loading reviews...</div>;

    if (reviews.length === 0) {
        return (
            <div className="text-gray-500 text-center py-8 bg-[#18181b]/50 rounded-2xl border border-[#27272a] border-dashed">
                No reviews yet. Be the first to share your experience!
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#27272a] p-2 rounded-full">
                                <User size={20} className="text-gray-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{review.user_name}</h4>
                                <div className="flex gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
