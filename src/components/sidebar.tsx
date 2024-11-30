import Link from "next/link";
import Routes from "@/utils/Routes";
import Image from "next/image";
import DottedSeparator from "@/components/dotted-separator";
import Navigation from "@/components/navigation";
import WorkspaceSwitcher from "@/components/workspace-switcher";
import Projects from "@/components/projects";

function Sidebar() {
    return (
        <aside className={'h-full w-full p-4 bg-neutral-100'}>
            <Link href={Routes.homePath}>
                <Image src={'/logo-full.svg'} alt={'logo'} width={120} height={48}/>
            </Link>
            <DottedSeparator className={'my-4'}/>
            <WorkspaceSwitcher/>
            <DottedSeparator className={'my-4'}/>
            <Navigation/>
            <DottedSeparator className={'my-4'}/>
            <Projects/>
        </aside>
    );
}

export default Sidebar;
