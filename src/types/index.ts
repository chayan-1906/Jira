import React from "react";
import {Account as AccountType, Databases as DatabasesType, Models, Storage as StorageType, Users as UsersType,} from "node-appwrite";

/** tanstack-query props */
export interface QueryProviderProps {
    children: React.ReactNode;
}

export interface AdditionalContext {
    Variables: {
        account: AccountType;
        databases: DatabasesType;
        storage: StorageType;
        users: UsersType;
        user: Models.User<Models.Preferences>;
    }
}

/** layout props */
export interface AuthLayoutProps {
    children: React.ReactNode;
}

export interface DashboardLayoutProps {
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

export interface CreateWorkspaceFormProps {
    onCancel?: () => void;
}

export interface WorkspaceAvatarProps {
    image?: string;
    name: string;
    className?: string;
}

export interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
