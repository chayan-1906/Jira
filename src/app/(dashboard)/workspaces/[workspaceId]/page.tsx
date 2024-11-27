import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";

export const dynamic = 'force-dynamic';

async function WorkSpaceIdPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <div>
            Workspace ID Page -
            {/*{params.workspaceId}*/}
        </div>
    );
}

export default WorkSpaceIdPage;
