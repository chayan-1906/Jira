import {createSessionClient} from "@/lib/appwrite";
import {cookies} from "next/headers";
import {AUTH_COOKIE} from "@/features/auth/constants";

export const getCurrent = async () => {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(AUTH_COOKIE);

        if (!session || !session.value) throw new Error('Unauthorized');

        const {account} = await createSessionClient();
        return await account.get();
    } catch (error) {
        console.log('inside catch of getCurrent: ❌', error);
        return null;
    }
}
