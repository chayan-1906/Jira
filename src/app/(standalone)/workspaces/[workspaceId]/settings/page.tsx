import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import ClientWorkspaceIdSettings from "@/app/(standalone)/workspaces/[workspaceId]/settings/client";

export const dynamic = 'force-dynamic';

async function WorkspaceIdSettingsPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <ClientWorkspaceIdSettings/>
    );
}

export default WorkspaceIdSettingsPage;
