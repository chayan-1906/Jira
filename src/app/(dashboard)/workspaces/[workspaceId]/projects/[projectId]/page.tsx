import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import {ProjectIdPageProps} from "@/types";
import {getProject} from "@/features/projects/queries";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import {PencilIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function ProjectIdPage({params}: ProjectIdPageProps) {
    const user = await getCurrent();
    const {workspaceId, projectId} = await params;

    if (!user) {
        redirect(Routes.signInPath);
    }

    const initialValues = await getProject({projectId});

    if (!initialValues) {
        throw new Error('Project not found');
    }

    return (
        <div className={'flex flex-col gap-y-4'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-x-2'}>
                    <ProjectAvatar name={initialValues.name} image={initialValues.imageUrl} className={'size-8'}/>
                    <p className={'text-lg font-semibold'}>{initialValues.name}</p>
                </div>

                <div>
                    <Button variant={'secondary'} size={'sm'} asChild>
                        <Link href={Routes.projectSettingsPath(initialValues.workspaceId, initialValues.$id)}>
                            <PencilIcon className={'size-4 mr-2'}/>
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default ProjectIdPage;
