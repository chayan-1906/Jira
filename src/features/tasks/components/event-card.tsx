import {EventCardProps} from "@/types";
import {cn} from "@/lib/utils";
import {TaskStatus} from "@/features/tasks/types";
import MemberAvatar from "@/features/members/components/member-avatar";
import React from "react";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useRouter} from "next/navigation";
import Routes from "@/utils/Routes";

const statusColorMap: Record<TaskStatus, string> = {
    [TaskStatus.TODO]: 'border-0-neutral-200',
    [TaskStatus.IN_PROGRESS]: 'border-l-yellow-400',
    [TaskStatus.IN_REVIEW]: 'border-l-blue-400',
    [TaskStatus.DONE]: 'border-l-green-600',
    [TaskStatus.BACKLOG]: 'border-l-pink-400',
}

function EventCard({id, title, assignee, project, status}: EventCardProps) {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        router.push(Routes.taskPath(workspaceId, id));
    }

    return (
        <div className={'px-2'}>
            <div onClick={onClick}
                 className={cn('flex flex-col p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 gap-y-1.5 cursor-pointer hover:opacity-75 transition', statusColorMap[status])}>
                <p className={''}>{title}</p>
                <div className={'flex items-center gap-2'}>
                    <MemberAvatar name={assignee?.name}/>
                    {/*<div className={'size-1 rounded-full bg-neutral-300'}>*/}
                        <ProjectAvatar name={project?.name} image={project?.imageUrl}/>
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}

export default EventCard;
