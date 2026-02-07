import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Folklore FC | Authentication',
    description: 'Authentication',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#09090b] text-white antialiased`}>
                {/* Simple container for auth pages */}
                <div className="min-h-screen flex flex-col items-center justify-center p-4">
                    {children}
                </div>
            </body>
        </html>
    );
}
