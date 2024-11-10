'use server';

import {Account, Client} from "node-appwrite";
import {cookies} from "next/headers";
import {AUTH_COOKIE} from "@/features/auth/constants";

export const getCurrent = async () => {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '');

        const session = (await cookies()).get(AUTH_COOKIE);

        if (!session) return null;

        client.setSession(session.value);

        const account = new Account(client);

        return await account.get();
    } catch (error) {
        console.log('inside catch of getCurrent: ❌', error);
        return null;
    }
}
