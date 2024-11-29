import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import {getCurrent} from "@/features/auth/queries";
import MembersList from "@/features/workspaces/components/members-list";

async function WorkspaceIdMembersPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <div className={'w-fit lg:max-w-xl'}>
            <MembersList user={user}/>
        </div>
    );
}

export default WorkspaceIdMembersPage;
