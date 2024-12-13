import {InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {toast} from 'sonner';
import Routes from "@/utils/Routes";

type ResponseType = InferResponseType<typeof client.api.auth.logout['$post']>;
// type RequestType = InferRequestType<typeof client.api.auth.logout['$post']>;

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.auth.logout['$post']();
            return await response.json();
        },
        onSuccess: () => {
            toast.success('Logged out');
            router.replace(Routes.signInPath);
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error('Failed to logout');
        },
    });

    return mutation;
}
