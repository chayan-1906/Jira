import {DataFilterProps} from "@/types";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FolderIcon, ListChecksIcon, UserIcon} from "lucide-react";
import {TaskStatus} from "@/features/tasks/types";
import {useTaskFilters} from "@/features/tasks/hooks/use-task-filters";
import {useProjectId} from "@/features/projects/hooks/use-project-id";
import {DatePicker} from "@/components/date-picker";

function DataFilters({hideProjectFilter}: DataFilterProps) {
    const workspaceId = useWorkspaceId();
    const projectIdFromHook = useProjectId();
    const {data: projects, isLoading: isLoadingProjects} = useGetProjects({workspaceId});
    const {data: members, isLoading: isLoadingMembers} = useGetMembers({workspaceId});
    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents?.map((project) => ({
        value: project.$id,
        label: project.name,
    }));

    const memberOptions = members?.documents?.map((member) => ({
        value: member.$id,
        label: member.name,
        email: member.email,
    }));

    const [{projectId: taskProjectId, status, assigneeId, search, dueDate}, setFilters] = useTaskFilters();
    const projectId = (taskProjectId === null) ? projectIdFromHook : taskProjectId;

    const onStatusChange = (value: string) => setFilters({status: value === 'all' ? null : value as TaskStatus})
    const onAssigneeChange = (value: string) => setFilters({assigneeId: value === 'all' ? null : value as string})
    const onProjectChange = (value: string) => setFilters({projectId: value === 'all' ? null : value as string})

    if (isLoading) return null;

    return (
        <div className={'flex flex-col lg:flex-row gap-2'}>
            {/** status */}
            <Select defaultValue={status ?? undefined} onValueChange={(value) => onStatusChange(value)}>
                <SelectTrigger className={'w-full lg:w-auto h-8'}>
                    <div className={'flex items-center pr-2'}>
                        <ListChecksIcon className={'size-4 mr-2'}/>
                        <SelectValue placeholder={'All Statuses'}/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={'all'}>All Statuses</SelectItem>
                    <SelectSeparator/>
                    <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={TaskStatus.TODO}>TO DO</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                </SelectContent>
            </Select>

            {/** assignee */}
            <Select defaultValue={assigneeId ?? undefined} onValueChange={(value) => onAssigneeChange(value)}>
                <SelectTrigger className={'w-full lg:w-auto h-8'}>
                    <div className={'flex items-center pr-2'}>
                        <UserIcon className={'size-4 mr-2'}/>
                        <SelectValue placeholder={'All assignees'}/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={'all'}>All assignees</SelectItem>
                    <SelectSeparator/>
                    {memberOptions?.map((member) => (
                        <SelectItem key={member.value} value={member.value}>{member.label} ({member.email})</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/** projectId */}
            {!hideProjectFilter && (
                <Select defaultValue={projectId ?? undefined} onValueChange={(value) => onProjectChange(value)}>
                    <SelectTrigger className={'w-full lg:w-auto h-8'}>
                        <div className={'flex items-center pr-2'}>
                            <FolderIcon className={'size-4 mr-2'}/>
                            <SelectValue placeholder={'All projects'}/>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'all'}>All projects</SelectItem>
                        <SelectSeparator/>
                        {projectOptions?.map((project) => (
                            <SelectItem key={project.value} value={project.value}>{project.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {/** date picker */}
            <DatePicker placeholder={'Due Date'} clasName={'h-8 w-full lg:w-auto'} value={dueDate ? new Date(dueDate) : undefined} onChange={(date) => {
                setFilters({dueDate: date ? date.toISOString() : null});
            }}/>
        </div>
    );
}

export default DataFilters;
