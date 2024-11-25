import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';

type ResponseType = InferResponseType<typeof client.api.workspaces[':workspaceId']['$patch'], 200>;
type RequestType = InferRequestType<typeof client.api.workspaces[':workspaceId']['$patch']>;

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({form, param}) => {
            const response = await client.api.workspaces[':workspaceId']['$patch']({form, param});

            if (!response.ok) {
                throw new Error('Unable to update workspace');
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success('Workspace updated');
            const workspaces = queryClient.invalidateQueries({queryKey: ['workspaces']});
            queryClient.invalidateQueries({queryKey: ['workspaces', data.$id]});
            console.log('workspaces from onSuccess:', workspaces);
        },
        onError: () => {
            toast.error('Unable to update workspace');
        },
    });

    return mutation;
}
