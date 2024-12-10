'use client';

import ProjectAvatar from "@/features/projects/components/project-avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Routes from "@/utils/Routes";
import {PencilIcon} from "lucide-react";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import {useProjectId} from "@/features/projects/hooks/use-project-id";
import {useGetProject} from "@/features/projects/api/use-get-project";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";
import {useGetProjectAnalytics} from "@/features/projects/api/use-get-project-analytics";
import Analytics from "@/components/analytics";

function ClientProjectId() {
    const projectId = useProjectId();
    const {data: project, isLoading: isLoadingProject} = useGetProject({projectId});
    const {data: projectAnalytics, isLoading: isLoadingProjectAnalytics} = useGetProjectAnalytics({projectId});
    const isLoading = isLoadingProject || isLoadingProjectAnalytics;

    if (isLoading) {
        return (
            <PageLoader/>
        );
    }

    if (!project) {
        return (
            <PageError message={'Project not found'}/>
        );
    }

    return (
        <div className={'flex flex-col gap-y-4'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-x-2'}>
                    <ProjectAvatar name={project.name} image={project.imageUrl} className={'size-8'}/>
                    <p className={'text-lg font-semibold'}>{project.name}</p>
                </div>

                <div>
                    <Button variant={'secondary'} size={'sm'} asChild>
                        <Link href={Routes.projectSettingsPath(project.workspaceId, project.$id)}>
                            <PencilIcon className={'size-4 mr-2'}/>
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            {projectAnalytics && (
                <Analytics data={projectAnalytics}/>
            )}
            <TaskViewSwitcher hideProjectFilter/>
        </div>
    );
}

export default ClientProjectId;
