import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';
import {useRouter} from "next/navigation";
import Routes from "@/utils/Routes";

type ResponseType = InferResponseType<typeof client.api.projects['$post'], 200>;
type RequestType = InferRequestType<typeof client.api.projects['$post']>;

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({form}) => {
            const response = await client.api.projects['$post']({form});

            if (!response.ok) {
                throw new Error('Unable to create project');
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success('Project created');
            const projects = queryClient.invalidateQueries({queryKey: ['projects']});
            router.push(Routes.projectIdPath(data.workspaceId, data.$id));
            console.log('project from onSuccess:', projects);
        },
        onError: () => {
            toast.error('Unable to create project');
        },
    });

    return mutation;
}
