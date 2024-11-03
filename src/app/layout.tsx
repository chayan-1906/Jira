import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import React from "react";

import {cn} from '@/lib/utils';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Jira',
    description: '',
};

function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={cn(inter.className, 'antialiased min-h-screen')}>
        {children}
        </body>
        </html>
    );
}

export default RootLayout;
