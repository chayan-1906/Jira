import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';
import {useUpdateTaskModal} from "@/features/tasks/hooks/use-update-task-modal";

type ResponseType = InferResponseType<typeof client.api.tasks[':taskId']['$patch'], 200>;
type RequestType = InferRequestType<typeof client.api.tasks[':taskId']['$patch']>;

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const {close} = useUpdateTaskModal();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({json, param}) => {
            const response = await client.api.tasks[':taskId']['$patch']({json, param});

            if (!response.ok) {
                throw new Error('Unable to update task');
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success('Task updated');

            queryClient.invalidateQueries({queryKey: ['project-analytics']});
            queryClient.invalidateQueries({queryKey: ['workspace-analytics']});
            const tasks = queryClient.invalidateQueries({queryKey: ['tasks']});
            queryClient.invalidateQueries({queryKey: ['task', data.$id]});
            close();
            console.log('task from onSuccess:', tasks);
        },
        onError: () => {
            toast.error('Unable to update task');
        },
    });

    return mutation;
}
