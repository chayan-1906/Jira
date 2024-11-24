import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import {getCurrent} from "@/features/auth/actions";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";

async function WorkspaceCreatePage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <div className={'w-full lg:max-w-xl'}>
            <CreateWorkspaceForm/>
        </div>
    );
}

export default WorkspaceCreatePage;
