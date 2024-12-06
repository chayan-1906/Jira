'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Loader, PlusIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import {useGetTasks} from "@/features/tasks/api/use-get-tasks";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useQueryState} from "nuqs";
import DataFilters from "@/features/tasks/components/data-filters";
import {useTaskFilters} from "@/features/tasks/hooks/use-task-filters";
import {useEffect, useRef} from "react";
import {useProjectId} from "@/features/projects/hooks/use-project-id";
import {DataTable} from "@/features/tasks/components/data-table";
import {columns} from "@/features/tasks/components/columns";
import DataKanban from "@/features/tasks/components/data-kanban";
import {TaskStatus} from "@/features/tasks/types";

function TaskViewSwitcher() {
    const {open} = useCreateTaskModal();
    const workspaceId = useWorkspaceId();
    const projectIdFromHook = useProjectId();
    const [{projectId: taskProjectId, status, assigneeId, search, dueDate}, setFilters] = useTaskFilters();

    const projectId = (taskProjectId === null) ? projectIdFromHook : taskProjectId;
    const {data: tasks, isLoading: isLoadingTasks} = useGetTasks({workspaceId, projectId, status, search, assigneeId, dueDate});

    const [view, setView] = useQueryState('task-view', {
        defaultValue: 'table',
    });

    const setFiltersRef = useRef(setFilters);

    useEffect(() => {
        setFiltersRef.current = setFilters;
    }, [setFilters]);

    useEffect(() => {
        async function setFiltersRefCurrent() {
            await setFiltersRef.current({projectId: projectIdFromHook});
        }

        setFiltersRefCurrent()
    }, [projectIdFromHook]);

    return (
        <Tabs defaultValue={view} onValueChange={setView} className={'flex-1 w-full border rounded-lg p-4'}>
            <div className={'flex flex-col lg:flex-row gap-y-2 justify-between items-center'}>
                <TabsList className={'w-full lg:w-auto'}>
                    <TabsTrigger className={'h-8 w-full lg:w-auto'} value={'table'}>Table</TabsTrigger>
                    <TabsTrigger className={'h-8 w-full lg:w-auto'} value={'kanban'}>Kanban</TabsTrigger>
                    <TabsTrigger className={'h-8 w-full lg:w-auto'} value={'calendar'}>Calendar</TabsTrigger>
                </TabsList>
                <Button size={'sm'} className={'w-full lg:w-auto'} onClick={() => open(TaskStatus.TODO)}><PlusIcon className={'size-4 mr-2'}/> New</Button>
            </div>

            <DottedSeparator className={'my-4'}/>
            <DataFilters/>
            <DottedSeparator className={'my-4'}/>
            {isLoadingTasks ? (
                <div className={'flex flex-col w-full items-center justify-center border rounded-lg h-[200px]'}>
                    <Loader className={'size-5 animate-spin text-muted-foreground'}/>
                </div>
            ) : (
                <>
                    <TabsContent value={'table'} className={'mt-0'}><DataTable columns={columns} data={tasks?.documents ?? []}/></TabsContent>
                    <TabsContent value={'kanban'} className={'mt-0'}><DataKanban data={tasks?.documents ?? []}/></TabsContent>
                    <TabsContent value={'calendar'} className={'mt-0'}>Data Calendar</TabsContent>
                </>
            )}
        </Tabs>
    );
}

export default TaskViewSwitcher;
