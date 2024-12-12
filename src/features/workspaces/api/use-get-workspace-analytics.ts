import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/rpc";
import {UseGetWorkspaceAnalyticsProps} from "@/types";
import {InferResponseType} from "hono";

export type WorkspaceAnalyticsResponseType = InferResponseType<typeof client.api.workspaces[':workspaceId']['analytics']['$get'], 200>;

export const useGetWorkspaceAnalytics = ({workspaceId}: UseGetWorkspaceAnalyticsProps) => {
    const query = useQuery({
        queryKey: ['workspace-analytics', workspaceId],
        queryFn: async () => {
            const response = await client.api.workspaces[':workspaceId']['analytics'].$get({
                param: {workspaceId},
            });

            if (!response.ok) {
                throw new Error('Failed to fetch workspace analytics');
            }

            const {data} = await response.json();

            return data;
        }
    });

    return query;
}
