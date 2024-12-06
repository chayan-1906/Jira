import {KanbanColumnHeaderProps} from "@/types";
import {snackCaseToUpperCase} from "@/features/members/utils";
import {TaskStatus} from "@/features/tasks/types";
import {ReactNode} from "react";
import {CircleCheckIcon, CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon, PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";

const statusIconMap: Record<TaskStatus, ReactNode> = {
    [TaskStatus.BACKLOG]: (
        <CircleDashedIcon className={'size-[18px] text-pink-400'}/>
    ),
    [TaskStatus.TODO]: (
        <CircleIcon className={'size-[18px] text-neutral-200'}/>
    ),
    [TaskStatus.IN_PROGRESS]: (
        <CircleDotDashedIcon className={'size-[18px] text-yellow-400'}/>
    ),
    [TaskStatus.IN_REVIEW]: (
        <CircleDotIcon className={'size-[18px] text-blue-400'}/>
    ),
    [TaskStatus.DONE]: (
        <CircleCheckIcon className={'size-[18px] text-green-600'}/>
    ),
}

function KanbanColumnHeader({board, taskCount}: KanbanColumnHeaderProps) {
    const icon = statusIconMap[board];
    const {open} = useCreateTaskModal();

    return (
        <div className={'flex items-center justify-between px-2 py-1.5'}>
            <div className={'flex items-center gap-x-2'}>
                {icon}
                <h2 className={'text-sm font-medium'}>{snackCaseToUpperCase(board)}</h2>
                <div className={'flex items-center justify-center rounded-md size-5 bg-neutral-200 text-xs text-neutral-700 font-medium'}>{taskCount}</div>
            </div>
            <Button variant={'ghost'} size={'icon'} className={'size-5'} onClick={() => open(board)}>
                <PlusIcon className={'size-4 text-neutral-500'}/>
            </Button>
        </div>
    );
}

export default KanbanColumnHeader;
