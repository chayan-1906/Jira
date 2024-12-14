import {ProjectsListProps} from "@/types";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import Link from "next/link";
import Routes from "@/utils/Routes";
import {Card, CardContent} from "@/components/ui/card";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import {ChevronRightIcon} from "@radix-ui/react-icons";

function WorkspaceProjectsList({projects, total}: ProjectsListProps) {
    const {open: createProject} = useCreateProjectModal();
    const workspaceId = useWorkspaceId();

    return (
        <div className={'flex flex-col gap-y-4 col-span-1'}>
            <div className={'bg-white border rounded-lg p-4'}>
                <div className={'flex items-center justify-between'}>
                    <p className={'text-lg font-semibold'}>Projects ({total})</p>
                    <Button variant={'secondary'} size={'icon'} onClick={createProject}>
                        <PlusIcon className={'size-4'}/>
                    </Button>
                </div>
                <DottedSeparator className={'my-4'}/>
                <ul className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
                    {projects.map((project) => {
                        const {$id, name, imageUrl} = project || {};

                        return (
                            <li key={$id}>
                                <Link href={Routes.projectIdPath(workspaceId, $id)}>
                                    <Card className={'shadow-none rounded-lg hover:opacity-75 transition'}>
                                        <CardContent className={'flex w-full items-center p-4 justify-between'}>
                                            <div className={'flex gap-2.5 items-center overflow-hidden'}>
                                                <ProjectAvatar name={name} image={imageUrl} className={'size-12'} fallbackClassName={'text-lg'}/>
                                                <p className={'text-lg font-medium truncate'}>{name}</p>
                                            </div>
                                            <ChevronRightIcon className={'size-8 text-muted-foreground flex-shrink-0'}/>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </li>
                        );
                    })}
                    <li className={'text-sm text-muted-foreground text-center hidden first-of-type:block'}>No projects found</li>
                </ul>
            </div>
        </div>
    );
}

export default WorkspaceProjectsList;
