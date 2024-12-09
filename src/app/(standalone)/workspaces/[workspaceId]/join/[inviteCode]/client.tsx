'use client';

import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useGetWorkspaceInfo} from "@/features/workspaces/api/use-get-workspace-info";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";

function ClientWorkspaceIdJoin() {
    const workspaceId = useWorkspaceId();
    const {data: initialValues, isLoading} = useGetWorkspaceInfo({workspaceId});

    if (isLoading) {
        return (
            <PageLoader/>
        );
    }

    if (!initialValues) {
        return (
            <PageError message={'Workspace not found'}/>
        );
    }

    return (
        <div className={'w-full lg:max-w-xl'}>
            <JoinWorkspaceForm initialValues={initialValues}/>
        </div>
    );
}

export default ClientWorkspaceIdJoin;
