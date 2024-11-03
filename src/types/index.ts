import React from "react";

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
