import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';

type ResponseType = InferResponseType<typeof client.api.projects[':projectId']['$patch'], 200>;
type RequestType = InferRequestType<typeof client.api.projects[':projectId']['$patch']>;

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({form, param}) => {
            const response = await client.api.projects[':projectId']['$patch']({form, param});

            if (!response.ok) {
                throw new Error('Unable to update project');
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success('Project updated');
            const projects = queryClient.invalidateQueries({queryKey: ['projects']});
            queryClient.invalidateQueries({queryKey: ['project', data.$id]});
            console.log('projects from onSuccess:', projects);
        },
        onError: () => {
            toast.error('Unable to update project');
        },
    });

    return mutation;
}
