import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';

type ResponseType = InferResponseType<typeof client.api.projects[':projectId']['$delete'], 200>;
type RequestType = InferRequestType<typeof client.api.projects[':projectId']['$delete']>;

// DONE BY MY OWN. SO INCOMPLETE
export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({param}) => {
            const response = await client.api.projects[':projectId']['$delete']({param});

            if (!response.ok) {
                throw new Error('Unable to delete project');
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success('Project deleted');
            queryClient.invalidateQueries({queryKey: ['projects']});
            queryClient.invalidateQueries({queryKey: ['project', data.$id]});
            // router.push(Routes.workspaceIdPath(data.$id));
            // console.log('workspaces from onSuccess:', workspaces);
        },
        onError: () => {
            toast.error('Unable to delete project');
        },
    });

    return mutation;
}