import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import React from "react";

import {cn} from '@/lib/utils';
import {QueryProvider} from "@/components/query-provider";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Jira',
    description: '',
};

function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={cn(inter.className, 'antialiased min-h-screen')}>
        <QueryProvider>
            <Toaster/>
            {children}
        </QueryProvider>
        </body>
        </html>
    );
}

export default RootLayout;
