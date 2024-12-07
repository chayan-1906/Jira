import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';

type ResponseType = InferResponseType<typeof client.api.tasks['bulk-update']['$post'], 200>;
type RequestType = InferRequestType<typeof client.api.tasks['bulk-update']['$post']>;

export const useBulkUpdateTask = () => {
    const queryClient = useQueryClient();
    // const router = useRouter();
    // const {close} = useUpdateTaskModal();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({json}) => {
            const response = await client.api.tasks['bulk-update']['$post']({json});

            if (!response.ok) {
                throw new Error('Unable to bulk update tasks');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success('Tasks updated');
            const tasks = queryClient.invalidateQueries({queryKey: ['tasks']});
            console.log('task from onSuccess:', tasks);
        },
        onError: () => {
            toast.error('Unable to bulk update tasks');
        },
    });

    return mutation;
}
