import {KanbanCardProps} from "@/types";
import TasksActions from "@/features/tasks/components/tasks-actions";
import {MoreHorizontal} from "lucide-react";
import MemberAvatar from "@/features/members/components/member-avatar";
import TaskDate from "@/features/tasks/components/task-date";
import ProjectAvatar from "@/features/projects/components/project-avatar";

function KanbanCard({task}: KanbanCardProps) {
    const {name, projectId, dueDate, assignee, project} = task || {};

    return (
        <div className={'bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3'}>
            <div className={'flex items-start justify-between gap-x-2'}>
                <p className={'text-sm line-clamp-2'}>{name}</p>
                <TasksActions id={task.$id} projectId={projectId}>
                    <MoreHorizontal className={'size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition'}/>
                </TasksActions>
            </div>
            <div className={'flex items-center gap-x-1.5'}>
                <MemberAvatar name={assignee.name} fallbackClassName={'text-[10px]'}/>
                <div className={'size-1 rounded-full bg-neutral-300'}/>
                <TaskDate value={dueDate} className={'text-xs'}/>
            </div>
            <div className={'flex items-center gap-x-1.5'}>
                <ProjectAvatar name={project.name} image={project.imageUrl} fallbackClassName={'text-[10px]'}/>
                <span className={'text-xs font-medium'}>{project.name}</span>
            </div>
        </div>
    );
}

export default KanbanCard;
