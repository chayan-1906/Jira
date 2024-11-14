'use client';

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MenuIcon} from "lucide-react";
import Sidebar from "@/components/sidebar";
import {DialogTitle} from "@/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => setIsOpen(false), [pathname]);

    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant={'secondary'} size={'icon'} className={'lg:hidden'}>
                    <MenuIcon className={'size-4 text-neutral-500'}/>
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className={'p-0'}>
                <VisuallyHidden>
                    <DialogTitle>Mobile Sidebar</DialogTitle>
                </VisuallyHidden>
                <Sidebar/>
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;
