import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';

type ResponseType = InferResponseType<typeof client.api.tasks[':taskId']['$delete'], 200>;
type RequestType = InferRequestType<typeof client.api.tasks[':taskId']['$delete']>;

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({param}) => {
            const response = await client.api.tasks[':taskId']['$delete']({param});

            if (!response.ok) {
                throw new Error('Unable to delete task');
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success('Task deleted');

            queryClient.invalidateQueries({queryKey: ['project-analytics']});
            queryClient.invalidateQueries({queryKey: ['workspace-analytics']});
            queryClient.invalidateQueries({queryKey: ['tasks']});
            queryClient.invalidateQueries({queryKey: ['task', data.$id]});
        },
        onError: () => {
            toast.error('Unable to delete task');
        },
    });

    return mutation;
}
