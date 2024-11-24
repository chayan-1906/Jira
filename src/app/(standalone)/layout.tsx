import {StandaloneLayoutProps} from "@/types";
import Link from "next/link";
import Routes from "@/utils/Routes";
import Image from "next/image";
import UserButton from "@/features/auth/components/user-button";

function StandaloneLayout({children}: StandaloneLayoutProps) {
    return (
        <main className={'bg-neutral-100 min-h-screen'}>
            <div className={'mx-auto max-w-screen-2xl p-4'}>
                <nav className={'flex justify-between items-center h-[73px]'}>
                    <Link href={Routes.homePath}>
                        <Image src={'/logo-full.svg'} alt={'logo'} width={120} height={48}/>
                    </Link>
                    <UserButton/>
                </nav>
                <div className={'flex flex-col items-center justify-center py-4'}>
                    {children}
                </div>
            </div>
        </main>
    );
}

export default StandaloneLayout;
