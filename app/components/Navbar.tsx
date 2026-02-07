'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Sparkles, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';


export default function Navbar({ t, locale }: { t: any, locale: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { items, toggleCart } = useCart();
    const { user, openAuthModal, signOut } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isRtl = locale === 'ar';

    return (
        <>


            {/* Top Bar - شريط الإعلانات العلوي */}
            <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center tracking-wide fixed top-0 w-full z-[60]">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles size={14} className="text-yellow-300 fill-yellow-300 animate-pulse" />
                    <span>{t.topBar}</span>
                    <Sparkles size={14} className="text-yellow-300 fill-yellow-300 animate-pulse" />
                </div>
            </div>

            {/* Main Navigation - شريط التنقل الأساسي */}
            <nav className={`fixed top-[32px] left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#09090b] border-b border-[#27272a] py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* الشعار */}
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">FOLKLORE FC</span>
                        </div>

                        {/* Desktop Menu - الروابط في شاشة الكمبيوتر */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{t.home}</button>
                            <button onClick={() => document.getElementById('men-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{t.men}</button>
                            <button onClick={() => document.getElementById('women-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{t.women}</button>
                            <Link href={`/${locale}/about`} className="text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{t.about}</Link>
                            <Link href={`/${locale}/blog`} className="text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1">
                                {t.blog}
                                <span className="h-1 w-1 bg-emerald-500 rounded-full"></span>
                            </Link>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-6">

                            {/* User Auth Icon */}
                            <div className="relative">
                                <button
                                    onClick={() => user ? setShowUserMenu(!showUserMenu) : openAuthModal()}
                                    className="text-white hover:text-emerald-500 transition-colors flex items-center gap-2"
                                >
                                    {user ? (
                                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold border border-emerald-400">
                                            {user.user_metadata.full_name ? user.user_metadata.full_name[0].toUpperCase() : 'U'}
                                        </div>
                                    ) : (
                                        <UserIcon size={22} />
                                    )}
                                </button>

                                {/* Dropdown Menu for Logged in Users */}
                                {user && showUserMenu && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-2 border-b border-[#27272a] mb-2">
                                            <p className="text-xs text-gray-400">Signed in as</p>
                                            <p className="text-sm font-bold text-white truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => { signOut(); setShowUserMenu(false); }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#27272a] transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button onClick={toggleCart} className="relative text-white hover:text-emerald-500 transition-colors">
                                <ShoppingBag size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full shadow-lg">{cartCount}</span>
                                )}
                            </button>

                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white transition-transform active:scale-90">
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Content - محتوى قائمة الهاتف */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-[#09090b] border-t border-[#27272a] absolute top-full left-0 w-full min-h-[50vh] p-8 flex flex-col gap-8 animate-in slide-in-from-top duration-300 shadow-2xl overflow-y-auto" dir={isRtl ? 'rtl' : 'ltr'}>
                        <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="text-3xl font-black text-left uppercase tracking-tighter italic">{t.home}</button>
                        <button onClick={() => { document.getElementById('men-section')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="text-xl font-black text-left uppercase tracking-tighter italic">{t.men}</button>
                        <button onClick={() => { document.getElementById('women-section')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="text-xl font-black text-left uppercase tracking-tighter italic">{t.women}</button>
                        <Link href={`/${locale}/about`} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-left uppercase tracking-tighter italic">{t.about}</Link>
                        <Link href={`/${locale}/blog`} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-left uppercase tracking-tighter italic text-emerald-500">{t.blog}</Link>

                        {/* Mobile Auth Button */}
                        <div className="mt-4 pt-4 border-t border-[#27272a]">
                            {user ? (
                                <button
                                    onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                                    className="w-full bg-red-500/10 text-red-500 font-bold py-4 rounded-xl border border-red-500/20"
                                >
                                    Sign Out ({user.email})
                                </button>
                            ) : (
                                <button
                                    onClick={() => { openAuthModal(); setIsMobileMenuOpen(false); }}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl"
                                >
                                    Sign In / Register
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};
