import {Models} from "node-appwrite";

export enum TaskStatus {
    BACKLOG = 'BACKLOG',
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    IN_REVIEW = 'IN_REVIEW',
    DONE = 'DONE',
}

export type Task = Models.Document & {
    workspaceId: string;
    name: string;
    assigneeId: string;
    projectId: string;
    dueDate: string;
    status: TaskStatus;
    position: number;
    description?: string;
}
