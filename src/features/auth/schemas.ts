import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Required'),
    // code: z.number(),
});

export const registerSchema = z.object({
    name: z.string().trim().min(1, 'Required'),
    email: z.string().email(),
    password: z.string().trim().min(8, 'Minimum of 8 characters required'),
});
