import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";

async function TasksPage() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <div className={'flex flex-col h-full'}>
            <TaskViewSwitcher/>
        </div>
    );
}

export default TasksPage;
