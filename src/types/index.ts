import React from "react";

/** tanstack-query props */
export interface QueryProviderProps {
    children: React.ReactNode;
}

/** layout props */
export interface AuthLayoutProps {
    children: React.ReactNode;
}

/** screen props */


/** component props */
export interface DottedSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    dotSize?: string;
    gapSize?: string;
    direction?: 'horizontal' | 'vertical';
}
