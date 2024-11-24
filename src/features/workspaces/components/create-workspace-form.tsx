'use client';

import {CreateWorkspaceFormProps} from "@/types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {createWorkspaceSchema} from "@/features/workspaces/schemas";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCreateWorkspace} from "@/features/workspaces/api/use-create-workspace";
import React, {useCallback, useRef} from "react";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ImageIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import Routes from "@/utils/Routes";

function CreateWorkspaceForm({onCancel}: CreateWorkspaceFormProps) {
    const {mutate, isPending} = useCreateWorkspace();
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: '',
        },
    });

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('image', file);
        }
    }, [form]);

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        console.log({values});
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : '',
        };
        mutate({form: finalValues}, {
            onSuccess: ({data}) => {
                // onSuccess is never getting triggered
                console.log('data:', data);
                form.reset();
                router.push(Routes.workspaceIdPath(data.$id));
            }
        });
    }

    return (
        <Card className={'w-full h-full border-none shadow-none'}>
            <CardHeader className={'flex p-7'}>
                <CardTitle className={'text-xl font-bold'}>Create a new workspace</CardTitle>
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
                                                <Button variant={'tertiary'} disabled={isPending} size={'xs'} className={'w-fit mt-2'} type={'button'} onClick={() => inputRef.current?.click()}>
                                                    Upload Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>

                        <DottedSeparator className={'py-7'}/>

                        <div className={'flex items-center justify-between'}>
                            <Button variant={'destructive'} disabled={isPending} type={'button'} onClick={onCancel}>Cancel</Button>
                            <Button type={'submit'} disabled={isPending} onClick={onCancel}>Create Workspace</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default CreateWorkspaceForm;
