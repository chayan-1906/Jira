import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import {WorkspaceIdSettingsPageProps} from "@/types";
import {getWorkspace} from "@/features/workspaces/queries";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";

export const dynamic = 'force-dynamic';

async function WorkspaceIdSettingsPage({params}: WorkspaceIdSettingsPageProps) {
    const user = await getCurrent();
    const {workspaceId} = await params;

    if (!user) {
        redirect(Routes.signInPath);
    }

    const initialValues = await getWorkspace({workspaceId: workspaceId});
    if (!initialValues) {
        redirect(Routes.workspaceIdPath(workspaceId));
    }

    return (
        <div className={'w-full lg:max-w-xl'}>
            <EditWorkspaceForm initialValues={initialValues}/>
        </div>
    );
}

export default WorkspaceIdSettingsPage;
