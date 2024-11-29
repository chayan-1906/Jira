import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import {WorkspaceIdPageProps} from "@/types";

export const dynamic = 'force-dynamic';

async function WorkSpaceIdPage({params}: WorkspaceIdPageProps) {
    const user = await getCurrent();
    const {workspaceId} = await params;

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <div>
            Workspace ID Page - {workspaceId}
        </div>
    );
}

export default WorkSpaceIdPage;
