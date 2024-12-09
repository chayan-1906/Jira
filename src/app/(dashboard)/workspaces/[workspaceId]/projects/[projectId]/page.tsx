import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import ClientProjectId from "@/app/(dashboard)/workspaces/[workspaceId]/projects/[projectId]/client";

export const dynamic = 'force-dynamic';

async function ProjectIdPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <ClientProjectId/>
    );
}

export default ProjectIdPage;
