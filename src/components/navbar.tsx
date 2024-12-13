'use client';

import UserButton from "@/features/auth/components/user-button";
import MobileSidebar from "@/components/mobile-sidebar";
import {usePathname} from "next/navigation";

const pathNameMap = {
    tasks: {
        title: 'My Tasks',
        description: 'View all of your tasks here',
    },
    projects: {
        title: 'My Projects',
        description: 'View tasks of your project here',
    },
}

const defaultMap = {
    title: 'Home',
    description: 'Monitor all of your projects and tasks',
}

function Navbar() {
    const pathName = usePathname();
    const pathNameParts = pathName.split('/');
    const pathNameKey = pathNameParts[3] as keyof typeof pathNameMap;

    const {title, description} = pathNameMap[pathNameKey] || defaultMap;

    return (
        <nav className={'flex items-center justify-between pt-4 px-6'}>
            <div className={'flex-col hidden lg:flex'}>
                <h1 className={'text-2xl font-semibold'}>{title}</h1>
                <p className={'text-muted-foreground'}>{description}</p>
            </div>
            <MobileSidebar/>
            <UserButton/>
        </nav>
    );
}

export default Navbar;
