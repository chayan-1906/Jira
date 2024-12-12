'use client';

import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useGetWorkspaceAnalytics} from "@/features/workspaces/api/use-get-workspace-analytics";
import {useGetTasks} from "@/features/tasks/api/use-get-tasks";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";
import Analytics from "@/components/analytics";
import WorkspaceTasksList from "@/features/workspaces/components/workspace-tasks-list";
import WorkspaceProjectsList from "@/features/workspaces/components/workspace-projects-list";
import WorkspaceMembersList from "@/features/workspaces/components/workspace-members-list";

function ClientWorkspaceId() {
    const workspaceId = useWorkspaceId();
    const {data: analytics, isLoading: isLoadingAnalytics} = useGetWorkspaceAnalytics({workspaceId});
    const {data: tasks, isLoading: isLoadingTasks} = useGetTasks({workspaceId});
    const {data: projects, isLoading: isLoadingProjects} = useGetProjects({workspaceId});
    const {data: members, isLoading: isLoadingMembers} = useGetMembers({workspaceId});

    const {open: createProject} = useCreateProjectModal();

    const isLoading = isLoadingAnalytics || isLoadingTasks || isLoadingProjects || isLoadingMembers;

    if (isLoading) {
        return (
            <PageLoader/>
        );
    }

    if (!analytics || !tasks || !projects || !members) {
        return (
            <PageError message={'Failed to load workspace data'}/>
        );
    }

    return (
        <div className={'flex flex-col h-full space-y-4'}>
            <Analytics data={analytics}/>
            <div className={'grid grid-cols-1 xl:grid-cols-2 gap-4'}>
                <WorkspaceTasksList tasks={tasks.documents} total={tasks.total}/>
                <WorkspaceProjectsList projects={projects.documents} total={projects.total}/>
                <WorkspaceMembersList members={members.documents} total={members.total}/>
            </div>
        </div>
    );
}

export default ClientWorkspaceId;
