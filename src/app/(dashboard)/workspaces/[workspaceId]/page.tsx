import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import ClientWorkspaceId from "@/app/(dashboard)/workspaces/[workspaceId]/client";

export const dynamic = 'force-dynamic';

async function WorkSpaceIdPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <ClientWorkspaceId/>
    );
}

export default WorkSpaceIdPage;
