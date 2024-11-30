'use client';

import {EditProjectFormProps} from "@/types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
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
import {useConfirm} from "@/hooks/use-confirm";
import {useUpdateProject} from "@/features/projects/api/use-update-project";
import {updateProjectSchema} from "@/features/projects/schemas";
import {useDeleteProject} from "@/features/projects/api/use-delete-project";

function EditProjectForm({initialValues, onCancel}: EditProjectFormProps) {
    const {mutate, isPending} = useUpdateProject();
    const {mutate: deleteProject, isPending: isDeletingProject} = useDeleteProject();
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [DeleteDialog, confirmDelete] = useConfirm('Delete Project', 'This action cannot be undone', 'destructive');

    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver: zodResolver(updateProjectSchema),
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

    const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
        console.log({values});
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : '',
        };
        mutate({form: finalValues, param: {projectId: initialValues.$id}}, {
            onSuccess: ({data}) => {
                // onSuccess is never getting triggered, functionality added in hook's onSuccess
                console.log('data:', data);
                form.reset();
                router.push(Routes.projectIdPath(data.workspaceId, data.$id));
            }
        });
    }

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteProject({param: {projectId: initialValues.$id}}, {
            onSuccess: () => {
                router.push(Routes.workspaceIdPath(initialValues.workspaceId));
                // window.location.href = '/';
            }
        });
    }

    return (
        <div className={'flex flex-col gap-y-4'}>
            <DeleteDialog/>

            <Card className={'w-full h-full border-none shadow-none'}>
                <CardHeader className={'flex flex-row items-center gap-x-4 p-7 space-y-0'}>
                    <Button variant={'secondary'} size={'sm'} onClick={onCancel ? onCancel : () => router.push(Routes.projectIdPath(initialValues.workspaceId, initialValues.$id))}>
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
                                {/** project name */}
                                <FormField
                                    name={'name'}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Project Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder={'Enter project name...'}/>
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
                                <Button variant={'destructive'} disabled={isPending || isDeletingProject} type={'button'} className={cn(!onCancel && 'invisible')} onClick={onCancel}>Cancel</Button>
                                <Button type={'submit'} disabled={isPending || isDeletingProject}>Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className={'w-full h-full border-none shadow-none'}>
                <CardContent className={'p-7'}>
                    <div className={'flex flex-col'}>
                        <h3 className={'font-black text-destructive'}>Danger Zone</h3>
                        <p className={'text-sm text-muted-foreground'}>Deleting a project is irreversible and will remove all associated data</p>
                        <DottedSeparator className={'py-7'}/>
                        <Button variant={'destructive'} size={'sm'} type={'button'} disabled={isPending || isDeletingProject} className={'w-fit ml-auto'} onClick={handleDelete}>
                            Delete Project
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default EditProjectForm;
