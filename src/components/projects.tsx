'use client';

import {RiAddCircleFill} from "react-icons/ri";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {usePathname} from "next/navigation";
import Routes from "@/utils/Routes";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";
import ProjectAvatar from "@/features/projects/components/project-avatar";

function Projects() {
    const workspaceId = useWorkspaceId();
    const {data} = useGetProjects({workspaceId});
    const {open} = useCreateProjectModal();
    const pathName = usePathname();

    return (
        <div className={'flex flex-col gap-y-2'}>
            <div className={'flex items-center justify-between'}>
                <p className={'text-xs uppercase font-semibold text-neutral-500'}>Projects</p>
                <RiAddCircleFill className={'size-5 text-neutral-500 cursor-pointer hover:opacity-75'} onClick={open}/>
            </div>
            {data?.documents?.map((project) => {
                const href = Routes.projectIdPath(workspaceId, project.$id);
                const isActive = pathName === href;

                return (
                    <Link href={href} key={project.$id}>
                        <div
                            className={cn('flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500', isActive && 'bg-white shadow-sm hover:opacity-100 text-primary')}>
                            <ProjectAvatar image={project.imageUrl} name={project.name} fallbackClassName={''}/>
                            <span className={'truncate'}>{project.name}</span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Projects;
