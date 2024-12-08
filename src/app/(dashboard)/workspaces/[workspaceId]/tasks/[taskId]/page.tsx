import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import ClientTaskId from "@/app/(dashboard)/workspaces/[workspaceId]/tasks/[taskId]/client";

async function TaskIdPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <div>
            <ClientTaskId/>
        </div>
    );
}

export default TaskIdPage;
