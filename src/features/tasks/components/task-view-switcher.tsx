'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";

function TaskViewSwitcher() {
    const {open} = useCreateTaskModal();

    return (
        <Tabs className={'flex-1 w-full border rounded-lg'}>
            <div className={'flex flex-col lg:flex-row gap-y-2 justify-between items-center'}>
                <TabsList className={'w-full lg:w-auto'}>
                    <TabsTrigger className={'h-8 w-full lg:w-auto'} value={'table'}>Table</TabsTrigger>
                    <TabsTrigger className={'h-8 w-full lg:w-auto'} value={'kanban'}>Kanban</TabsTrigger>
                    <TabsTrigger className={'h-8 w-full lg:w-auto'} value={'calendar'}>Calendar</TabsTrigger>
                </TabsList>
                <Button size={'sm'} className={'w-full lg:w-auto'} onClick={open}><PlusIcon className={'size-4 mr-2'}/> New</Button>
            </div>

            <DottedSeparator className={'my-4'}/>
            Data filters
            <DottedSeparator className={'my-4'}/>
            <>
                <TabsContent value={'table'} className={'mt-0'}>Data Table</TabsContent>
                <TabsContent value={'kanban'} className={'mt-0'}>Data Kanban</TabsContent>
                <TabsContent value={'calendar'} className={'mt-0'}>Data Calendar</TabsContent>
            </>
        </Tabs>
    );
}

export default TaskViewSwitcher;
