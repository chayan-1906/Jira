import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import {getWorkspaces} from "@/features/workspaces/queries";

async function Home() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    const workspaces = await getWorkspaces();
    if (workspaces.total === 0) {
        redirect(Routes.createWorkspacePath);
    } else {
        redirect(Routes.workspaceIdPath(workspaces.documents[0].$id));
    }
}

export default Home;
