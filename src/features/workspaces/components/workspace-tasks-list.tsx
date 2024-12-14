import {Button} from "@/components/ui/button";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import {CalendarIcon, PlusIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import Link from "next/link";
import Routes from "@/utils/Routes";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {Card, CardContent} from "@/components/ui/card";
import {formatDistanceToNow} from "date-fns";
import {TasksListProps} from "@/types";
import {ChevronRightIcon} from "@radix-ui/react-icons";

function WorkspaceTasksList({tasks, total}: TasksListProps) {
    const {open: createTask} = useCreateTaskModal();
    const workspaceId = useWorkspaceId();

    return (
        <div className={'flex flex-col gap-y-4 col-span-1'}>
            <div className={'bg-muted rounded-lg p-4'}>
                <div className={'flex items-center justify-between'}>
                    <p className={'text-lg font-semibold'}>Tasks ({total})</p>
                    <Button variant={'muted'} size={'icon'} onClick={createTask}>
                        <PlusIcon className={'size-4'}/>
                    </Button>
                </div>
                <DottedSeparator className={'my-4'}/>
                <ul className={'flex flex-col gap-y-4'}>
                    {tasks.map((task) => {
                        const {$id, name, project, dueDate} = task || {};

                        return (
                            <li key={$id}>
                                <Link href={Routes.taskPath(workspaceId, $id)}>
                                    <Card className={'shadow-none rounded-lg hover:opacity-75 transition'}>
                                        <CardContent className={'flex p-4 justify-between items-center'}>
                                            <div className={'flex flex-col w-full'}>
                                                <p className={'text-lg font-medium truncate'}>{name}</p>
                                                <div className={'flex items-center gap-x-2'}>
                                                    <p>{project?.name}</p>
                                                    <div className={'size-1 rounded-full bg-neutral-300'}/>
                                                    <div className={'flex items-center text-sm text-muted-foreground'}>
                                                        <CalendarIcon className={'size-3 mr-1'}/>
                                                        <span className={'truncate'}>{formatDistanceToNow(new Date(dueDate))}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRightIcon className={'size-8 text-muted-foreground'}/>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </li>
                        );
                    })}
                    <li className={'text-sm text-muted-foreground text-center hidden first-of-type:block'}>No tasks found</li>
                </ul>
                <Button variant={'muted'} className={'mt-4 w-full'} asChild>
                    <Link href={Routes.tasksPath(workspaceId)}>Show All</Link>
                </Button>
            </div>
        </div>
    );
}

export default WorkspaceTasksList;
