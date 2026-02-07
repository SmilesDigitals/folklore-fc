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
        const currentPath = window.location.pathname;
        const origin = window.location.origin;

        // 1. Detect Locale (first segment of path)
        const pathSegments = currentPath.split('/').filter(Boolean);
        const supportedLocales = ['ar', 'fr', 'en', 'es', 'ja'];
        const currentLocale = supportedLocales.includes(pathSegments[0]) ? pathSegments[0] : 'en';

        // 2. Determine Next Path
        let nextPath = '/';

        // Check if we are on ANY checkout page (including dynamic ones like /checkout/123)
        if (currentPath.includes('/checkout')) {
            nextPath = currentPath;
        } else if (authIntent === 'checkout') {
            // Redirecting to checkout from elsewhere (e.g. Cart)
            nextPath = `/${currentLocale}/checkout`;
        } else if (authIntent && authIntent !== 'checkout') {
            // Other intents
            const intentPath = authIntent.startsWith('/') ? authIntent : `/${authIntent}`;
            nextPath = `/${currentLocale}${intentPath}`;
        } else {
            // Default behavior: return to current page or home
            // If just logging in from a random page, usually better to return to that page
            // But per previous requirements, let's Stick to currentPath if it makes sense, or Home.
            // For now, let's default to currentPath to be safe and robust as requested "capture full pathname"
            nextPath = currentPath === '/' || currentPath === `/${currentLocale}` ? currentPath : currentPath;
        }

        // 3. Construct Redirect URL with strict encoding
        // Ensure nextPath starts with /
        if (!nextPath.startsWith('/')) {
            nextPath = `/${nextPath}`;
        }

        // Encode the next path to prevent breaking the URL
        const encodedNext = encodeURIComponent(nextPath);
        const redirectUrl = `${origin}/auth/callback?next=${encodedNext}`;

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl,
            },
        });
        if (error) {
            console.error('❌ Error signing in:', error.message);
            alert(`Login Failed: ${error.message}`);
        }
    }, [authIntent]);

    const signOut = React.useCallback(async () => {
        await supabase.auth.signOut();
        window.location.reload();
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
