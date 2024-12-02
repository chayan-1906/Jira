import {UpdateTaskFormWrapperProps} from "@/types";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {Card, CardContent} from "@/components/ui/card";
import {Loader} from "lucide-react";
import {useGetTask} from "@/features/tasks/api/use-get-task";
import UpdateTaskForm from "@/features/tasks/components/update-task-form";

function UpdateTaskFormWrapper({id, onCancel}: UpdateTaskFormWrapperProps) {
    const workspaceId = useWorkspaceId();

    const {data: initialValues, isLoading: isLoadingTask} = useGetTask({taskId: id});
    const {data: projects, isLoading: isLoadingProjects} = useGetProjects({workspaceId});
    const {data: members, isLoading: isLoadingMembers} = useGetMembers({workspaceId});

    const projectOptions = projects?.documents?.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl,
    }));

    const memberOptions = members?.documents?.map((member) => ({
        id: member.$id,
        name: member.name,
        email: member.email,
    }));

    const isLoading = isLoadingTask || isLoadingProjects || isLoadingMembers;

    if (isLoading) {
        return (
            <Card className={'w-full h-[200px] border-none shadow-none'}>
                <CardContent className={'flex items-center justify-center h-full'}>
                    <Loader className={'size-5 animate-spin text-muted-foreground'}/>
                </CardContent>
            </Card>
        );
    }

    if (!initialValues) {
        return null;
    }

    return (
        <UpdateTaskForm onCancel={onCancel} projectOptions={projectOptions ?? []} memberOptions={memberOptions ?? []} initialValues={initialValues}/>
    );
}

export default UpdateTaskFormWrapper;
