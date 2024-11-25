import {getCurrent} from "@/features/auth/actions";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import {WorkspaceIdSettingsProps} from "@/types";
import {getWorkspace} from "@/features/workspaces/actions";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";

async function WorkspaceIdSettingsPage({params}: WorkspaceIdSettingsProps) {
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
