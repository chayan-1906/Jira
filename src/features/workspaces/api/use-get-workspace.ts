import {client} from "@/lib/rpc";
import {useQuery} from "@tanstack/react-query";
import {UseGetWorkspaceProps} from "@/types";

export const useGetWorkspace = ({workspaceId}: UseGetWorkspaceProps) => {
    const query = useQuery({
        queryKey: ['workspace', workspaceId],
        queryFn: async () => {
            const response = await client.api.workspaces[':workspaceId'].$get({
                param: {workspaceId},
            });

            if (!response.ok) {
                throw new Error('Failed to fetch workspace');
            }

            const {data} = await response.json();

            return data;
        }
    });

    return query;
}
