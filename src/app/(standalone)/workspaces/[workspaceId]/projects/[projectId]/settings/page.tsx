import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import {ProjectIdSettingsPageProps} from "@/types";
import {getProject} from "@/features/projects/queries";
import EditProjectForm from "@/features/projects/components/edit-project-form";

export const dynamic = 'force-dynamic';

async function ProjectIdSettingsPage({params}: ProjectIdSettingsPageProps) {
    const user = await getCurrent();
    const {projectId} = await params;

    if (!user) {
        redirect(Routes.signInPath);
    }

    const initialValues = await getProject({projectId});

    return (
        <div className={'w-full lg:max-w-xl'}>
            <EditProjectForm initialValues={initialValues}/>
        </div>
    );
}

export default ProjectIdSettingsPage;
