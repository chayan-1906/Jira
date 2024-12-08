import {TaskBreadcrumbsProps} from "@/types";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import Link from "next/link";
import Routes from "@/utils/Routes";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {useDeleteTask} from "@/features/tasks/api/use-delete-task";
import {useConfirm} from "@/hooks/use-confirm";
import {useCallback} from "react";
import {useRouter} from "next/navigation";

function TaskBreadcrumbs({project, task}: TaskBreadcrumbsProps) {
    const workspaceId = useWorkspaceId();
    const {$id: projectId, name: projectName, imageUrl} = project || {};
    const {$id: taskId, name: taskName} = task || {};

    const {mutate, isPending} = useDeleteTask();
    const [ConfirmDialog, confirm] = useConfirm('Delete Task', 'This action cannot be undone', 'destructive');
    const router = useRouter();

    const handleDeleteTask = useCallback(async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({param: {taskId}}, {
            onSuccess: () => {
                router.push(Routes.tasksPath(workspaceId));
            },
        });
    }, [confirm, mutate, router, taskId, workspaceId]);

    return (
        <div className={'flex items-center gap-x-2'}>
            <ConfirmDialog/>

            <ProjectAvatar name={projectName} image={imageUrl} className={'size-6 lg:size-8'}/>
            <Link href={Routes.projectIdPath(workspaceId, projectId)}>
                <p className={'text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition'}>{projectName}</p>
            </Link>
            <ChevronRightIcon className={'size-4 lg:size-5 text-muted-foreground'}/>
            <p className={'text-sm lg:text-lg font-semibold'}>{taskName}</p>
            <Button variant={'destructive'} size={'sm'} className={'ml-auto'} disabled={isPending} onClick={handleDeleteTask}>
                <TrashIcon className={'size-4 lg:mr-2'}/>
                <span className={'hidden lg:block'}>Delete Task</span>
            </Button>
        </div>
    );
}

export default TaskBreadcrumbs;
