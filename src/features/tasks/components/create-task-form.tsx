'use client';

import {CreateTaskFormProps} from "@/types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useRef} from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {createTaskSchema} from "@/features/tasks/schemas";
import {useCreateTask} from "@/features/tasks/api/use-create-task";
import {DatePicker} from "@/components/date-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import MemberAvatar from "@/features/members/components/member-avatar";
import {TaskStatus} from "@/features/tasks/types";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import {useProjectId} from "@/features/projects/hooks/use-project-id";

function CreateTaskForm({onCancel, projectOptions, memberOptions}: CreateTaskFormProps) {
    const workspaceId = useWorkspaceId();
    const projectId = useProjectId();
    const {mutate, isPending} = useCreateTask();
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema.omit({workspaceId: true})),
        defaultValues: {
            name: '',
            workspaceId,
            projectId,
        },
    });

    const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
        console.log({values});
        mutate({json: {...values, workspaceId}}, {
            onSuccess: ({data}) => {
                // onSuccess is never getting triggered, functionality added in hook's onSuccess
                console.log('data:', data);
                form.reset();
            }
        });
    }

    return (
        <Card className={'w-full h-full border-none shadow-none'}>
            <CardHeader className={'flex p-7'}>
                <CardTitle className={'text-xl font-bold'}>Create a new task</CardTitle>
            </CardHeader>

            <div className={'px-7'}>
                <DottedSeparator/>
            </div>

            <CardContent className={'p-7'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={'flex flex-col gap-y-4'}>
                            {/** task name */}
                            <FormField
                                name={'name'}
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Task Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={'Enter task name...'}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/** due date */}
                            <FormField
                                name={'dueDate'}
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Task Name</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/** assignee */}
                            <FormField
                                name={'assigneeId'}
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Assignee</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={'Select assignee'}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage/>
                                            <SelectContent>
                                                {memberOptions.map((member) => (
                                                    <SelectItem key={member.id} value={member.id}>
                                                        <div className={'flex items-center gap-x-2'}>
                                                            <MemberAvatar className={'size-6'} name={member.name}/>
                                                            {member.name} ({member.email})
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {/** status */}
                            <FormField
                                name={'status'}
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={'Select status'}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage/>
                                            <SelectContent>
                                                <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                                                <SelectItem value={TaskStatus.TODO}>TO DO</SelectItem>
                                                <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                                                <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                                                <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {/** projectId */}
                            <FormField
                                name={'projectId'}
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Project</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={'Select project'}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage/>
                                            <SelectContent>
                                                {projectOptions.map((project) => (
                                                    <SelectItem key={project.id} value={project.id}>
                                                        <div className={'flex items-center gap-x-2'}>
                                                            <ProjectAvatar className={'size-6'} name={project.name} image={project.imageUrl}/>
                                                            {project.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DottedSeparator className={'py-7'}/>

                        <div className={'flex items-center justify-between'}>
                            <Button variant={'destructive'} disabled={isPending} type={'button'} className={cn(!onCancel && 'invisible')} onClick={onCancel}>Cancel</Button>
                            <Button type={'submit'} disabled={isPending}>Create Task</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default CreateTaskForm;