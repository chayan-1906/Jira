import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';
import {useRouter} from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.workspaces[':workspaceId']['$delete'], 200>;
type RequestType = InferRequestType<typeof client.api.workspaces[':workspaceId']['$delete']>;

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({param}) => {
            const response = await client.api.workspaces[':workspaceId']['$delete']({param});

            if (!response.ok) {
                throw new Error('Unable to delete workspace');
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success('Workspace deleted');
            queryClient.invalidateQueries({queryKey: ['workspaces']});
            queryClient.invalidateQueries({queryKey: ['workspace', data.$id]});
            // router.push(Routes.workspaceIdPath(data.$id));
            // console.log('workspaces from onSuccess:', workspaces);
        },
        onError: () => {
            toast.error('Unable to delete workspace');
        },
    });

    return mutation;
}