import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from 'sonner';

type ResponseType = InferResponseType<typeof client.api.members[':memberId']['$patch'], 200>;
type RequestType = InferRequestType<typeof client.api.members[':memberId']['$patch']>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({param, json}) => {
            const response = await client.api.members[':memberId']['$patch']({param, json});

            if (!response.ok) {
                throw new Error('Unable to update member');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success('Member updated');
            const members = queryClient.invalidateQueries({queryKey: ['members']});
            console.log('members from onSuccess:', members);
        },
        onError: () => {
            toast.error('Unable to update member');
        },
    });

    return mutation;
}
