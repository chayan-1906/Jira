import {DashboardLayoutProps} from "@/types";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";

function DashboardLayout({children}: DashboardLayoutProps) {
    return (
        <div className={'min-h-screen'}>
            <CreateWorkspaceModal/>
            <div className={'flex w-full h-full'}>
                <div className={'fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto'}>
                    <Sidebar/>
                </div>
                <div className={'w-full lg:pl-[264px]'}>
                    <div className={'mx-auto max-w-screen-2xl h-full'}>
                        <Navbar/>
                        <main className={'flex flex-col h-full py-8 px-6'}>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;
