import Link from "next/link";
import Routes from "@/utils/Routes";
import Image from "next/image";
import DottedSeparator from "@/components/dotted-separator";
import Navigation from "@/components/navigation";

function Sidebar() {
    return (
        <aside className={'h-full w-full p-4 bg-neutral-100'}>
            <Link href={Routes.homePath}>
                <Image src={'/logo-full.svg'} alt={'logo'} width={120} height={48}/>
            </Link>
            <DottedSeparator className={'my-4'}/>
            <Navigation/>
        </aside>
    );
}

export default Sidebar;