import {TaskActionProps} from "@/types";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ExternalLinkIcon, PencilIcon, TrashIcon} from "lucide-react";
import {useDeleteTask} from "@/features/tasks/api/use-delete-task";
import {useConfirm} from "@/hooks/use-confirm";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import Routes from "@/utils/Routes";
import Link from "next/link";
import {useUpdateTaskModal} from "@/features/tasks/hooks/use-update-task-modal";

function TasksActions({id, projectId, children}: TaskActionProps) {
    const workspaceId = useWorkspaceId();
    const {mutate, isPending} = useDeleteTask();
    const [ConfirmDialog, confirm] = useConfirm('Delete Task', 'This action cannot be undone', 'destructive');
    const {open} = useUpdateTaskModal();

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({param: {taskId: id}});
    }

    return (
        <div className={'flex justify-end'}>
            <ConfirmDialog/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align={'end'} className={'w-48'}>
                    {/** task details */}
                    <DropdownMenuItem disabled={isPending} className={'font-medium p-[10px]'}>
                        <Link href={Routes.taskIdPath(workspaceId, projectId, id)} className={'flex gap-2'}>
                            <ExternalLinkIcon className={'size-4 mr-2 stroke-2'}/>
                            Task Details
                        </Link>
                    </DropdownMenuItem>

                    {/** open project */}
                    <DropdownMenuItem disabled={isPending} className={'font-medium p-[10px]'}>
                        <Link href={Routes.projectIdPath(workspaceId, projectId)} className={'flex gap-2'}>
                            <ExternalLinkIcon className={'size-4 mr-2 stroke-2'}/>
                            Open Project
                        </Link>
                    </DropdownMenuItem>

                    {/** edit task */}
                    <DropdownMenuItem onClick={() => {open(id)}} disabled={isPending} className={'font-medium p-[10px]'}>
                        <PencilIcon className={'size-4 mr-2 stroke-2'}/>
                        Edit Task
                    </DropdownMenuItem>

                    {/** delete task */}
                    <DropdownMenuItem onClick={onDelete} disabled={isPending} className={'text-amber-700 focus:text-amber-700/80 font-medium p-[10px]'}>
                        <TrashIcon className={'size-4 mr-2 stroke-2'}/>
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default TasksActions;
