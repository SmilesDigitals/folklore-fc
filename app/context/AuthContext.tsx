'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    isAuthModalOpen: boolean;
    openAuthModal: (intent?: string) => void;
    closeAuthModal: () => void;
    authIntent: string | null; // e.g., 'checkout', 'review'
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAuthModalOpen: false,
    openAuthModal: () => { },
    closeAuthModal: () => { },
    authIntent: null,
    signInWithGoogle: async () => { },
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authIntent, setAuthIntent] = useState<string | null>(null);

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
            if (session?.user) {
                // Close modal on successful login
                setIsAuthModalOpen(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const openAuthModal = React.useCallback((intent?: string) => {
        setAuthIntent(intent || null);
        setIsAuthModalOpen(true);
    }, []);

    const closeAuthModal = React.useCallback(() => {
        setIsAuthModalOpen(false);
        setAuthIntent(null);
    }, []);

    const signInWithGoogle = React.useCallback(async () => {
        // Fix for checkout redirect: Use current pathname to preserve locale (e.g. /ar/checkout)
        const currentPath = window.location.pathname;
        // If we are on checkout page (any locale), ALWAYS return there, regardless of how modal was opened
        const next = currentPath.includes('/checkout') ? currentPath : (authIntent || '/');

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
            },
        });
        if (error) {
            console.error('❌ Error signing in:', error.message);
            alert(`Login Failed: ${error.message}`);
        }
    }, [authIntent]);

    const signOut = React.useCallback(async () => {
        await supabase.auth.signOut();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal,
            authIntent,
            signInWithGoogle,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
