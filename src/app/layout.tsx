import type {Metadata} from "next";
import "./globals.css";
import {Montserrat} from "next/font/google";
import React from "react";

const montserrat = Montserrat({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Jira',
    description: '',
};

function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={montserrat.className}>
        {children}
        </body>
        </html>
    );
}

export default RootLayout;
