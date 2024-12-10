import React from "react";
import {Account as AccountType, Databases, Databases as DatabasesType, Models, Storage as StorageType, Users as UsersType,} from "node-appwrite";
import {Workspace} from "@/features/workspaces/types";
import {Project} from "@/features/projects/types";
import {Task, TaskStatus} from "@/features/tasks/types";

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

export interface UseGetWorkspaceInfoProps {
    workspaceId: string;
}

export interface UseGetProjectsProps {
    workspaceId: string;
}

export interface UseGetProjectProps {
    projectId: string;
}

export interface UseGetProjectAnalyticsProps {
    projectId: string;
}

export interface UseGetTasksProps {
    workspaceId: string;
    projectId?: string | null;
    status?: TaskStatus | null;
    search?: string | null;
    assigneeId?: string | null;
    dueDate?: string | null;
}

export interface UseGetTaskProps {
    taskId: string;
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

export interface WorkspaceIdJoinPageProps {
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

export interface DatePickerProps {
    value: Date | undefined;
    onChange: (date: Date) => void;
    clasName?: string;
    placeholder?: string;
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
}

export interface CreateProjectFormProps {
    onCancel?: () => void;
}

export interface ProjectAvatarProps {
    image?: string;
    name: string;
    className?: string;
    fallbackClassName?: string;
}

export interface EditProjectFormProps {
    initialValues: Project;
    onCancel?: () => void;
}

export interface CreateTaskFormWrapperProps {
    onCancel?: () => void;
}

export interface CreateTaskFormProps {
    onCancel?: () => void;
    projectOptions: {
        id: string;
        name: string;
        imageUrl: string,
    }[];
    memberOptions: {
        id: string;
        name: string;
        email: string;
    }[];
}

export interface DataFilterProps {
    hideProjectFilter?: boolean;
}

export interface TaskDateProps {
    value: string;
    className?: string;
}

export interface TaskActionProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}

export interface UpdateTaskFormWrapperProps {
    id: string;
    onCancel?: () => void;
}

export interface UpdateTaskFormProps {
    onCancel?: () => void;
    projectOptions: {
        id: string;
        name: string;
        imageUrl: string,
    }[];
    memberOptions: {
        id: string;
        name: string;
        email: string;
    }[];
    initialValues: Task;
}

export interface DataKanbanProps {
    data: Task[];
    onChange: (tasks: { $id: string; status: TaskStatus; position: number }[]) => void;
}

export interface KanbanColumnHeaderProps {
    board: TaskStatus;
    taskCount: number;
}

export interface KanbanCardProps {
    task: Task;
}

export interface DataCalendarProps {
    data: Task[];
}

export interface EventCardProps {
    title: string;
    assignee: any;
    project: Project;
    status: TaskStatus;
    id: string;
}

export interface CustomToolbarProps {
    date: Date;
    onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
}

export interface TaskViewSwitcherProps {
    hideProjectFilter?: boolean;
}

export interface PageErrorProps {
    message: string;
}

export interface TaskBreadcrumbsProps {
    project: Project;
    task: Task;
}

export interface TaskOverviewProps {
    task: Task;
}

export interface OverviewPropertyProps {
    label: string;
    children: React.ReactNode;
}

export interface TaskDescriptionProps {
    task: Task;
}

export interface AnalyticsProps {
    data?: {
        taskCount: number;
        taskDifference: number;
        projectCount?: number;
        projectDifference?: number;
        assignedTaskCount: number;
        assignedTaskDifference: number;
        completedTaskCount: number;
        completedTaskDifference: number;
        incompleteTaskCount?: number;
        incompleteTaskDifference?: number;
        overdueTaskCount: number;
        overdueTaskDifference: number;
    };
}

export interface AnalyticsCardProps {
    title: string;
    value: number;
    variant: 'up' | 'down';
    increaseValue: number;
}
