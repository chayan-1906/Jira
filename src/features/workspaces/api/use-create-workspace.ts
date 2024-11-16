import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';
import {useRouter} from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.workspaces['$post']>;
type RequestType = InferRequestType<typeof client.api.workspaces['$post']>;

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({form}) => {
            const response = await client.api.workspaces['$post']({form});

            if (!response.ok) {
                throw new Error('Unable to create workspace');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success('Workspace created');
            queryClient.invalidateQueries({queryKey: ['workspaces']});
        },
        onError: () => {
            toast.error('Unable to create workspace');
        },
    });

    return mutation;
}
