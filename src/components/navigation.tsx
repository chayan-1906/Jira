'use client';

import Routes from "@/utils/Routes";
import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go";
import {SettingsIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {usePathname} from "next/navigation";

const routes = (workspaceId: string) => [
    {
        label: 'Home',
        href: Routes.homePath,
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        label: 'My Tasks',
        href: Routes.tasksPath(workspaceId),
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
    },
    {
        label: 'Settings',
        href: Routes.settingsPath(workspaceId),
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: 'Members',
        href: Routes.membersPath(workspaceId),
        icon: UsersIcon,
        activeIcon: UsersIcon,
    },
];

function Navigation() {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    return (
        <div className={'flex flex-col'}>
            {routes(workspaceId).map((item) => {
                const {label, href, icon, activeIcon} = item || {};
                const isActive = pathname === href;
                const Icon = isActive ? activeIcon : icon;

                return (
                    <Link key={href} href={href}>
                        <div className={cn('flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500', isActive && 'bg-white shadow-sm hover:opacity-100 text-primary')}>
                            <Icon className={'size-5 text-neutral-500'}/>
                            {label}
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

export default Navigation;
