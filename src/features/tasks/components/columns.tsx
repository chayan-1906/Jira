'use client';

import {ColumnDef} from "@tanstack/react-table";
import {Task} from "@/features/tasks/types";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreVertical} from "lucide-react";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import MemberAvatar from "@/features/members/components/member-avatar";
import TaskDate from "@/features/tasks/components/task-date";
import {Badge} from "@/components/ui/badge";
import {snackCaseToTitleCase} from "@/features/members/utils";
import TasksActions from "@/features/tasks/components/tasks-actions";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: 'name',
        header: ({column}) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Task Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => {
            const name = row.original.name;

            return (
                <p className={'line-clamp-1'}>{name}</p>
            );
        },
    },
    {
        accessorKey: 'project',
        header: ({column}) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Project
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => {
            const project = row.original.project;

            return (
                <div className={'flex items-center gap-x-2 text-sm font-medium'}>
                    <ProjectAvatar name={project.name} className={'size-6'} image={project.imageUrl}/>
                    <p className={'line-clamp-1'}>{project.name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'assignee',
        header: 'Assignee',
        /*header: ({column}) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Assignee
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },*/
        cell: ({row}) => {
            const assignee = row.original.assignee;

            return (
                <div className={'flex items-center gap-x-2 text-sm font-medium'}>
                    <MemberAvatar name={assignee.name} className={'size-6'} fallbackClassName={'text-xs'}/>
                    <p className={'line-clamp-1'}>{assignee.name} ({assignee.email})</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'dueDate',
        header: 'Due Date',
        /*header: ({column}) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Due Date
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },*/
        cell: ({row}) => {
            const dueDate = row.original.dueDate;

            return (
                <TaskDate value={dueDate}/>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        /*header: ({column}) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },*/
        cell: ({row}) => {
            const status = row.original.status;

            return (
                <Badge variant={status}>{snackCaseToTitleCase(status)}</Badge>
            );
        },
    },
    {
        accessorKey: 'actions',
        cell: ({row}) => {
            const id = row.original.$id;
            const projectId = row.original.projectId;

            return (
                <TasksActions key={id} id={id} projectId={projectId}>
                    <Button variant={'ghost'} className={'size-8'}>
                        <MoreVertical className={'size-4'}/>
                    </Button>
                </TasksActions>
            );
        },
    },
];
