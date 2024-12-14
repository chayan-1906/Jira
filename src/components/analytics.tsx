import {ProjectAnalyticsResponseType} from "@/features/projects/api/use-get-project-analytics";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import AnalyticsCard from "@/components/analytics-card";
import DottedSeparator from "@/components/dotted-separator";

function Analytics({data}: ProjectAnalyticsResponseType) {
    const {
        taskCount,
        taskDifference,
        assignedTaskCount,
        assignedTaskDifference,
        completedTaskCount,
        completedTaskDifference,
        overdueTaskCount,
        overdueTaskDifference,
        incompleteTaskCount,
        incompleteTaskDifference,
    } = data || {};

    return (
        <ScrollArea className={'border rounded-lg w-full whitespace-nowrap shrink-0'}>
            <div className={'flex w-full h-full'}>
                <div className={'flex flex-1 items-center'}>
                    <AnalyticsCard title={'Total tasks'} value={taskCount} variant={taskDifference > 0 ? 'up' : 'down'} increaseValue={taskDifference}/>
                </div>

                <DottedSeparator direction={'vertical'}/>

                <div className={'flex flex-1 items-center'}>
                    <AnalyticsCard title={'Assigned Tasks'} value={assignedTaskCount} variant={assignedTaskDifference > 0 ? 'up' : 'down'} increaseValue={assignedTaskDifference}/>
                </div>

                <DottedSeparator direction={'vertical'}/>

                <div className={'flex flex-1 items-center'}>
                    <AnalyticsCard title={'Completed Tasks'} value={completedTaskCount} variant={completedTaskDifference > 0 ? 'up' : 'down'} increaseValue={completedTaskDifference}/>
                </div>

                <DottedSeparator direction={'vertical'}/>

                <div className={'flex flex-1 items-center'}>
                    <AnalyticsCard title={'Overdue Tasks'} value={overdueTaskCount} variant={overdueTaskDifference > 0 ? 'up' : 'down'} increaseValue={overdueTaskDifference}/>
                </div>

                <DottedSeparator direction={'vertical'}/>

                <div className={'flex flex-1 items-center'}>
                    <AnalyticsCard title={'Incomplete Tasks'} value={incompleteTaskCount} variant={incompleteTaskDifference > 0 ? 'up' : 'down'} increaseValue={incompleteTaskDifference}/>
                </div>
            </div>
            <ScrollBar orientation={'horizontal'}/>
        </ScrollArea>
    );
}

export default Analytics;
