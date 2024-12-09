import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import ClientWorkspaceIdJoin from "@/app/(standalone)/workspaces/[workspaceId]/join/[inviteCode]/client";

async function WorkspaceIdJoinPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <ClientWorkspaceIdJoin/>
    );
}

export default WorkspaceIdJoinPage;
