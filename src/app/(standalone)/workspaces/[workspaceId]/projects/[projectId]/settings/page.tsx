import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import ClientProjectIdSettings from "@/app/(standalone)/workspaces/[workspaceId]/projects/[projectId]/settings/client";

export const dynamic = 'force-dynamic';

async function ProjectIdSettingsPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <ClientProjectIdSettings/>
    );
}

export default ProjectIdSettingsPage;
