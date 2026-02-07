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

        if (currentPath.includes('/checkout')) {
            // If already on checkout, stay there (preserve locale)
            nextPath = currentPath;
        } else if (authIntent) {
            // If intent exists (e.g. 'checkout' from cart), prepend locale if missing
            // Ensure authIntent starts with / if not present
            const intentPath = authIntent.startsWith('/') ? authIntent : `/${authIntent}`;
            nextPath = `/${currentLocale}${intentPath}`;
        } else {
            // Default to home with locale
            nextPath = `/${currentLocale}`;
        }

        // 3. Construct Redirect URL with encoding and proper slashes
        // Ensure nextPath starts with /
        if (!nextPath.startsWith('/')) {
            nextPath = `/${nextPath}`;
        }

        const redirectUrl = `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;

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
