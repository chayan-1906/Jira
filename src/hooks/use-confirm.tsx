import {Button, ButtonProps} from "@/components/ui/button";
import {useState} from "react";
import ResponsiveModal from "@/components/responsive-modal";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const useConfirm = (title: string, message: string, variant: ButtonProps['variant'] = 'primary'): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({resolve});
        });
    }

    const handleClose = () => {
        setPromise(null);
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmationDialog = () => {
        return (
            <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
                <Card className={'w-full h-full border-none shadow-none'}>
                    <CardContent className={'pt-8'}>
                        <CardHeader className={'p-0'}>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{message}</CardDescription>
                        </CardHeader>
                        <div className={'flex flex-col md:flex-row w-full items-center justify-end pt-4 gap-y-2 gap-x-2'}>
                            <Button variant={'outline'} onClick={handleCancel} className={'w-full lg:w-auto'}>Cancel</Button>
                            <Button variant={variant} onClick={handleConfirm} className={'w-full lg:w-auto'}>Confirm</Button>
                        </div>
                    </CardContent>
                </Card>
            </ResponsiveModal>
        );
    }

    return [ConfirmationDialog, confirm]
}
