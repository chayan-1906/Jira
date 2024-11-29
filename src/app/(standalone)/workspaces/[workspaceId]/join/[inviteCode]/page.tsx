import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import {getWorkspaceInfo} from "@/features/workspaces/queries";
import {WorkspaceIdJoinPageProps} from "@/types";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";

async function WorkspaceIdJoinPage({params}: WorkspaceIdJoinPageProps) {
    const user = await getCurrent();
    const {workspaceId, inviteCode} = await params;

    if (!user) {
        redirect(Routes.signInPath);
    }

    const initialValues = await getWorkspaceInfo({workspaceId});

    if (!initialValues) {
        redirect(Routes.homePath);
    }

    return (
        <div className={'w-full lg:max-w-xl'}>
            <JoinWorkspaceForm initialValues={initialValues} inviteCode={inviteCode} workspaceId={workspaceId}/>
        </div>
    );
}

export default WorkspaceIdJoinPage;
