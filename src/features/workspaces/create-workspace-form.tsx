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

function CreateWorkspaceForm({onCancel}: CreateWorkspaceFormProps) {
    const {mutate, isPending} = useCreateWorkspace();

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        console.log({values});
        mutate({json: values});
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
