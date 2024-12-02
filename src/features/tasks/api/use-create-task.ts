import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';
import {useRouter} from "next/navigation";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";

type ResponseType = InferResponseType<typeof client.api.tasks['$post'], 200>;
type RequestType = InferRequestType<typeof client.api.tasks['$post']>;

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {close} = useCreateTaskModal();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({json}) => {
            const response = await client.api.tasks['$post']({json});

            if (!response.ok) {
                throw new Error('Unable to create task');
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success('Task created');
            const tasks = queryClient.invalidateQueries({queryKey: ['tasks']});
            // router.push(Routes.taskIdPath(data.workspaceId, data.projectId, data.$id));
            close();
            console.log('task from onSuccess:', tasks);
        },
        onError: () => {
            toast.error('Unable to create task');
        },
    });

    return mutation;
}
