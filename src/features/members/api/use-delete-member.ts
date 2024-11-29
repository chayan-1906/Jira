import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';

type ResponseType = InferResponseType<typeof client.api.members[':memberId']['$delete'], 200>;
type RequestType = InferRequestType<typeof client.api.members[':memberId']['$delete']>;

export const useDeleteMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({param}) => {
            const response = await client.api.members[':memberId']['$delete']({param});

            if (!response.ok) {
                throw new Error('Unable to delete member');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success('Member removed');
            queryClient.invalidateQueries({queryKey: ['members']});
        },
        onError: () => {
            toast.error('Unable to delete member');
        },
    });

    return mutation;
}
