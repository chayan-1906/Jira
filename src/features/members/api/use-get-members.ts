import {client} from "@/lib/rpc";
import {useQuery} from "@tanstack/react-query";
import {UseGetMemberProps} from "@/types";

export const useGetMembers = ({workspaceId}: UseGetMemberProps) => {
    const query = useQuery({
        queryKey: ['members', workspaceId],
        queryFn: async () => {
            const response = await client.api.members.$get({query: {workspaceId}});

            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }

            const {data} = await response.json();
            // console.log()

            return data;
        }
    });

    return query;
}
