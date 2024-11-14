import Routes from "@/utils/Routes";
import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go";
import {SettingsIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";

const routes = [
    {
        label: 'Home',
        href: Routes.homePath,
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        label: 'My Tasks',
        href: Routes.tasksPath,
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
    },
    {
        label: 'Settings',
        href: Routes.settingsPath,
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: 'Members',
        href: Routes.membersPath,
        icon: UsersIcon,
        activeIcon: UsersIcon,
    },
];

function Navigation() {
    return (
        <div className={'flex flex-col'}>
            {routes.map((item) => {
                const {label, href, icon, activeIcon} = item || {};
                const isActive = false;
                const Icon = isActive ? activeIcon : icon;

                return (
                    <Link key={href} href={href}>
                        <div className={cn('flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500', isActive && 'bg-white shadow-sm hover:opacity-100 text-primary')}>
                            <Icon className={'size-5 text-neutral-500'}/>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

export default Navigation;
