import {getCurrent} from "@/features/auth/actions";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import CreateWorkspaceForm from "@/features/workspaces/create-workspace-form";

async function Home() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <div className={'bg-neutral-500  p-4 h-full'}>
            <CreateWorkspaceForm/>
        </div>
    );
}

export default Home;
