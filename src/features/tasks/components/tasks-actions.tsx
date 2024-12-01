import {TaskActionProps} from "@/types";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ExternalLinkIcon, PencilIcon, TrashIcon} from "lucide-react";

function TasksActions({id, projectId, children}: TaskActionProps) {
    return (
        <div className={'flex justify-end'}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align={'end'} className={'w-48'}>
                    {/** task details */}
                    <DropdownMenuItem onClick={() => {
                    }} disabled={false} className={'font-medium p-[10px]'}>
                        <ExternalLinkIcon className={'size-4 mr-2 stroke-2'}/>
                        Task Details
                    </DropdownMenuItem>

                    {/** open project */}
                    <DropdownMenuItem onClick={() => {
                    }} disabled={false} className={'font-medium p-[10px]'}>
                        <ExternalLinkIcon className={'size-4 mr-2 stroke-2'}/>
                        Open Project
                    </DropdownMenuItem>

                    {/** edit task */}
                    <DropdownMenuItem onClick={() => {
                    }} disabled={false} className={'font-medium p-[10px]'}>
                        <PencilIcon className={'size-4 mr-2 stroke-2'}/>
                        Edit Task
                    </DropdownMenuItem>

                    {/** delete task */}
                    <DropdownMenuItem onClick={() => {
                    }} disabled={false} className={'text-amber-700 focus:text-amber-700/80 font-medium p-[10px]'}>
                        <TrashIcon className={'size-4 mr-2 stroke-2'}/>
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default TasksActions;
