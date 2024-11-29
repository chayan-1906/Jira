import React from "react";
import {Account as AccountType, Databases, Databases as DatabasesType, Models, Storage as StorageType, Users as UsersType,} from "node-appwrite";
import {Workspace} from "@/features/workspaces/types";

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

export interface GetMemberProps {
    databases: Databases;
    workspaceId: string;
    userId: string;
}

export interface GetWorkspaceProps {
    workspaceId: string;
}

export interface GetWorkspaceInfoProps {
    workspaceId: string;
}

/** hook props */
export interface UseGetMemberProps {
    workspaceId: string;
}

/** layout props */
export interface AuthLayoutProps {
    children: React.ReactNode;
}

export interface DashboardLayoutProps {
    children: React.ReactNode;
}

export interface StandaloneLayoutProps {
    children: React.ReactNode;
}

/** screen props */
export interface WorkspaceIdPageProps {
    params: Promise<{
        workspaceId: string;
    }>;
}

export interface WorkspaceIdSettingsPageProps {
    params: Promise<{
        workspaceId: string;
    }>;
}

export interface WorkspaceIdJoinPageProps {
    params: Promise<{
        workspaceId: string;
        inviteCode: string;
    }>;
}

export interface WorkspaceIdMembersPageProps {
    params: Promise<{
        workspaceId: string;
        inviteCode: string;
    }>;
}

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

export interface MemberAvatarProps {
    name: string;
    className?: string;
    fallbackClassName?: string;
}

export interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface EditWorkspaceFormProps {
    initialValues: Workspace;
    onCancel?: () => void;
}

export interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    };
    inviteCode: string;
    workspaceId: string;
}
