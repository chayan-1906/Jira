import {ResponsiveModalProps} from "@/types";
import {useMedia} from "react-use";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Drawer, DrawerContent, DrawerTitle} from "@/components/ui/drawer";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

const ResponsiveModal = ({children, open, onOpenChange}: ResponsiveModalProps) => {
    const isDesktop = useMedia('(min-width: 1024px)', true);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <VisuallyHidden>
                    <DialogTitle></DialogTitle>
                    <DialogContent className={'w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]'}>
                        {children}
                    </DialogContent>
                </VisuallyHidden>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <VisuallyHidden>
                <DrawerTitle></DrawerTitle>
                <DrawerContent>
                    <div className={'overflow-y-auto hide-scrollbar max-h-[85vh]'}>
                        {children}
                    </div>
                </DrawerContent>
            </VisuallyHidden>
        </Drawer>
    );
}

export default ResponsiveModal;
