import {TaskOverviewProps} from "@/types";
import {Button} from "@/components/ui/button";
import {PencilIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import OverviewProperty from "@/features/tasks/components/overview-property";
import MemberAvatar from "@/features/members/components/member-avatar";
import TaskDate from "@/features/tasks/components/task-date";
import {Badge} from "@/components/ui/badge";
import {snakeCaseToUpperCase} from "@/features/members/utils";
import {useUpdateTaskModal} from "@/features/tasks/hooks/use-update-task-modal";

function TaskOverview({task}: TaskOverviewProps) {
    const {$id, assignee, dueDate, status} = task || {};
    const {open} = useUpdateTaskModal();

    return (
        <div className={'flex flex-col gap-y-4 col-span-1'}>
            <div className={'bg-muted rounded-lg p-4'}>
                <div className={'flex items-center justify-between'}>
                    <p className={'text-lg font-semibold'}>Overview</p>
                    <Button variant={'secondary'} size={'sm'} onClick={() => open($id)}>
                        <PencilIcon className={'size-4 mr-2'}/>
                        Edit
                    </Button>
                </div>
                <DottedSeparator className={'my-4'}/>
                <div className={'flex flex-col gap-y-4'}>
                    <OverviewProperty label={'Assignee'}>
                        <MemberAvatar name={assignee.name} className={'size-6'}/>
                        <p className={'text-sm font-medium'}>{assignee.name}</p>
                    </OverviewProperty>
                    <OverviewProperty label={'Due Date'}>
                        <TaskDate value={dueDate} className={'text-sm font-medium'}/>
                    </OverviewProperty>
                    <OverviewProperty label={'Status'}>
                        <Badge variant={status}>{snakeCaseToUpperCase(status)}</Badge>
                    </OverviewProperty>
                </div>
            </div>
        </div>
    );
}

export default TaskOverview;
