'use client';

import {useCurrent} from "@/features/auth/api/use-current";
import {Loader, LogOut} from "lucide-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import DottedSeparator from "@/components/dotted-separator";
import {useLogout} from "@/features/auth/api/use-logout";

function UserButton() {
    const {data: user, isLoading} = useCurrent();
    const {name, email} = user || {};
    const {mutate: logout} = useLogout();

    const avatarFallback = name ? name.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase() ?? 'U';

    if (isLoading) {
        return (
            <div className={'flex items-center justify-center rounded-full size-10 bg-neutral-200 border border-neutral-300'}>
                <Loader className={'size-4 animate-spin text-muted-foreground'}/>
            </div>
        );
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={'relative outline-none'}>
                <Avatar className={'size-10 hover:opacity-75 transition border border-neutral-300'}>
                    <AvatarFallback className={'flex items-center justify-center bg-neutral-200 font-medium text-neutral-500'}>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={'end'} side={'bottom'} className={'w-60'} sideOffset={10}>
                <div className={'flex flex-col items-center justify-center gap-2 px-2.5 py-4'}>
                    <Avatar className={'size-[52px] border border-neutral-300'}>
                        <AvatarFallback className={'flex items-center justify-center bg-neutral-200 text-xl font-medium text-neutral-500'}>
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className={'flex flex-col items-center justify-center'}>
                        <p className={'text-sm font-medium text-neutral-900'}>{name || 'User'}</p>
                        <p className={'text-xs text-neutral-500'}>{email}</p>
                    </div>
                </div>
                <DottedSeparator className={'mb-1'}/>
                <DropdownMenuItem onClick={() => logout()} className={'flex items-center justify-center h-10 text-amber-700 font-semibold cursor-pointer'}>
                    <LogOut className={'mr-2 size-4'}/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserButton;
