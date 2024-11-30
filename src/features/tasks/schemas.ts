import {z} from "zod";
import {TaskStatus} from "@/features/tasks/types";

export const createTaskSchema = z.object({
    workspaceId: z.string().trim().min(1, 'Required'),
    name: z.string().trim().min(1, 'Required'),
    projectId: z.string().trim().min(1, 'Required'),
    assigneeId: z.string().trim().min(1, 'Required'),
    description: z.string().optional(),
    dueDate: z.coerce.date(),
    status: z.nativeEnum(TaskStatus, {required_error: 'Required'}),
});
