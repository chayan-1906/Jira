'use client';

import {EditWorkspaceFormProps} from "@/types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {updateWorkspaceSchema} from "@/features/workspaces/schemas";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useCallback, useRef} from "react";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ArrowLeftIcon, ImageIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import Routes from "@/utils/Routes";
import {cn} from "@/lib/utils";
import {useUpdateWorkspace} from "@/features/workspaces/api/use-update-workspace";
import {useConfirm} from "@/hooks/use-confirm";
import {useDeleteWorkspace} from "@/features/workspaces/api/use-delete-workspace";
import {CopyIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";
import {BASE_URL} from "@/config";
import {useResetInviteCode} from "@/features/workspaces/api/use-reset-invite-code";

function EditWorkspaceForm({initialValues, onCancel}: EditWorkspaceFormProps) {
    const {mutate, isPending} = useUpdateWorkspace();
    const {mutate: resetInviteCode, isPending: isResettingInviteCode} = useResetInviteCode();
    const {mutate: deleteWorkspace, isPending: isDeletingWorkspace} = useDeleteWorkspace();
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const fullInviteLink = `${BASE_URL}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

    const [ResetDialog, confirmReset] = useConfirm('Reset Invite Link', 'This will invalidate the current invite link', 'destructive');
    const [DeleteDialog, confirmDelete] = useConfirm('Delete Workspace', 'This action cannot be undone', 'destructive');

    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? '',
        },
    });

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('image', file);
        }
    }, [form]);

    const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
        console.log({values});
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : '',
        };
        mutate({form: finalValues, param: {workspaceId: initialValues.$id}}, {
            onSuccess: ({data}) => {
                // onSuccess is never getting triggered, functionality added in hook's onSuccess
                console.log('data:', data);
                form.reset();
                router.push(Routes.workspaceIdPath(data.$id));
            }
        });
    }

    const handleResetInviteCode = async () => {
        const ok = await confirmReset();

        if (!ok) return;

        resetInviteCode({param: {workspaceId: initialValues.$id}}, {
            onSuccess: () => {
                router.refresh();
            }
        });
    }

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteWorkspace({param: {workspaceId: initialValues.$id}}, {
            onSuccess: () => {
                router.push(Routes.homePath);
                // window.location.href = '/';
            }
        });
    }

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(fullInviteLink).then(() => toast.success('Invite Link copied to clipboard'));
    }

    return (
        <div className={'flex flex-col gap-y-4'}>
            <DeleteDialog/>
            <ResetDialog/>

            <Card className={'w-full h-full border-none shadow-none'}>
                <CardHeader className={'flex flex-row items-center gap-x-4 p-7 space-y-0'}>
                    <Button variant={'secondary'} size={'sm'} onClick={onCancel ? onCancel : () => router.push(Routes.workspaceIdPath(initialValues.$id))}>
                        <ArrowLeftIcon className={'size-4'}/> Back
                    </Button>
                    <CardTitle className={'text-xl font-bold'}>{initialValues.name}</CardTitle>
                </CardHeader>

                <div className={'px-7'}>
                    <DottedSeparator/>
                </div>

                <CardContent className={'p-7'}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className={'flex flex-col gap-y-4'}>
                                {/** workspace name */}
                                <FormField
                                    name={'name'}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Workspace Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder={'Enter workspace name...'}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/** image */}
                                <FormField
                                    name={'image'}
                                    control={form.control}
                                    render={({field}) => (
                                        <div className={'flex flex-col gap-y-2'}>
                                            <div className={'flex items-center gap-x-5'}>
                                                {field.value ? (
                                                    <div className={'relative size-[72px] rounded-md overflow-hidden'}>
                                                        <Image src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value} alt={'image'} fill className={'object-cover'}/>
                                                    </div>
                                                ) : (
                                                    <Avatar className={'size-[72px]'}>
                                                        <AvatarFallback>
                                                            <ImageIcon className={'size-[36px] text-neutral-400'}/>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className={'flex flex-col'}>
                                                    <p className={'text-sm'}>Workspace Icon</p>
                                                    <p className={'text-sm text-muted-foreground'}>JPG, PNG, SVG or JPEG, max 1MB</p>
                                                    <input ref={inputRef} disabled={isPending} type={'file'} className={'hidden'} accept={'.jpg, .png, .jpeg, .svg'} onChange={handleImageChange}/>
                                                    {field.value ? (
                                                        <Button variant={'destructive'} disabled={isPending} size={'xs'} className={'w-fit mt-2'} type={'button'} onClick={() => {
                                                            field.onChange(null);
                                                            if (inputRef.current) {
                                                                inputRef.current.value = '';
                                                            }
                                                        }}>
                                                            Remove Image
                                                        </Button>
                                                    ) : (
                                                        <Button variant={'tertiary'} disabled={isPending} size={'xs'} className={'w-fit mt-2'} type={'button'}
                                                                onClick={() => inputRef.current?.click()}>
                                                            Upload Image
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>

                            <DottedSeparator className={'py-7'}/>

                            <div className={'flex items-center justify-between'}>
                                <Button variant={'destructive'} disabled={isPending || isDeletingWorkspace} type={'button'} className={cn(!onCancel && 'invisible')} onClick={onCancel}>Cancel</Button>
                                <Button type={'submit'} disabled={isPending || isDeletingWorkspace} onClick={onCancel}>Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className={'w-full h-full border-none shadow-none'}>
                <CardContent className={'p-7'}>
                    <div className={'flex flex-col'}>
                        <h3 className={'font-bold'}>Invite Members</h3>
                        <p className={'text-sm text-muted-foreground'}>Use the invite link to add members to your workspace</p>
                        <div className={'mt-4'}>
                            <div className={'flex items-center gap-x-2'}>
                                <Input disabled value={fullInviteLink}/>
                                <Button variant={'secondary'} className={'size-12'} onClick={handleCopyInviteLink}><CopyIcon className={'size-5'}/></Button>
                            </div>
                        </div>
                        <DottedSeparator className={'py-7'}/>
                        <Button variant={'destructive'} size={'sm'} type={'button'} disabled={isPending || isResettingInviteCode} className={'w-fit ml-auto'} onClick={handleResetInviteCode}>
                            Reset Invite Link
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className={'w-full h-full border-none shadow-none'}>
                <CardContent className={'p-7'}>
                    <div className={'flex flex-col'}>
                        <h3 className={'font-black text-destructive'}>Danger Zone</h3>
                        <p className={'text-sm text-muted-foreground'}>Deleting a workspace is irreversible and will remove all associated data</p>
                        <DottedSeparator className={'py-7'}/>
                        <Button variant={'destructive'} size={'sm'} type={'button'} disabled={isPending || isDeletingWorkspace} className={'w-fit ml-auto'} onClick={handleDelete}>
                            Delete Workspace
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default EditWorkspaceForm;
