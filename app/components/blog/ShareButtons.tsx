'use client';

import React, { useState } from 'react';
import { Twitter, Facebook, Link as LinkIcon, Share2, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShareButtons({ title }: { title: string }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const url = typeof window !== 'undefined' ? window.location.origin + pathname : '';

    const shareLinks = [
        {
            icon: <Twitter size={20} />,
            label: 'Twitter',
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: 'bg-black text-white'
        },
        {
            icon: <Facebook size={20} />,
            label: 'Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'bg-blue-600 text-white'
        }
    ];

    const handleCopy = () => {
        if (typeof navigator !== 'undefined') {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-3 mb-2"
                    >
                        {shareLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${link.color}`}
                                title={link.label}
                            >
                                {link.icon}
                            </a>
                        ))}
                        <button
                            onClick={handleCopy}
                            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform bg-gray-700 text-white relative`}
                        >
                            {copied ? <span className="text-[10px] font-bold">Copied</span> : <LinkIcon size={20} />}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-emerald-500 hover:scale-110'}`}
            >
                {isOpen ? <X size={24} className="text-white" /> : <Share2 size={24} className="text-white" />}
            </button>
        </div>
    );
}
