'use client';

import {AuthLayoutProps} from "@/types";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import Routes from "@/utils/Routes";
import Link from "next/link";

function AuthLayout({children}: AuthLayoutProps) {
    const pathname = usePathname();

    return (
        <main className={'bg-neutral-100 min-h-screen'}>
            <div className={'mx-auto max-w-screen-2xl p-4'}>
                <nav className={'flex justify-between items-center'}>
                    <Image src={'/logo.svg'} alt={'logo'} height={152} width={56}/>
                    <Button asChild variant={'secondary'}>
                        <Link href={pathname === Routes.signInPath ? Routes.signUpPath : Routes.signInPath}>{pathname === Routes.signInPath ? 'Sign up' : 'Sign in'}</Link>
                    </Button>
                </nav>
                <div className={'flex flex-col items-center justify-center pt-4 md:pt-14'}>

                </div>
            </div>
            <div className={'flex w-full justify-center'}>
                {children}
            </div>
        </main>
    );
}

export default AuthLayout;
