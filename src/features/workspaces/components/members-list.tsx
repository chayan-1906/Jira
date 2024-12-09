'use client';

import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowLeftIcon, MoreVerticalIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Routes from "@/utils/Routes";
import DottedSeparator from "@/components/dotted-separator";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {Fragment, useCallback, useEffect, useState} from "react";
import MemberAvatar from "@/features/members/components/member-avatar";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useDeleteMember} from "@/features/members/api/use-delete-member";
import {useUpdateMember} from "@/features/members/api/use-update-member";
import {MemberRole} from "@/features/members/types";
import {useConfirm} from "@/hooks/use-confirm";
import {Models} from "node-appwrite";
import Preferences = Models.Preferences;
import User = Models.User;

function MembersList({user}: { user: User<Preferences> }) {
    const workspaceId = useWorkspaceId();
    const {data} = useGetMembers({workspaceId});
    const {mutate: deleteMember, isPending: isDeletingMember} = useDeleteMember();
    const {mutate: updateMember, isPending: isUpdatingMember} = useUpdateMember();
    const [ConfirmDialog, confirm] = useConfirm('Remove Member', 'This member will be removed from the workspace', 'destructive');

    const [currentUserRole, setCurrentUserRole] = useState<MemberRole>(MemberRole.MEMBER)

    const handleUpdateMember = useCallback((memberId: string, role: MemberRole) => {
        updateMember({
            json: {role},
            param: {memberId},
        })
    }, [updateMember]);

    const handleDeleteMember = useCallback(async (memberId: string) => {
        const ok = await confirm();
        if (!ok) return;

        deleteMember({param: {memberId}});
    }, [confirm, deleteMember]);

    useEffect(() => {
        // console.log('useGetMembers:', data);
        // console.log('user:', user);
        data?.documents?.map((member) => {
            if (member.userId === user.$id) {
                setCurrentUserRole(member.role);
            }
        });
    }, [data?.documents, user.$id]);

    return (
        <Card className={'w-full h-full border-none shadow-none'}>
            <ConfirmDialog/>

            <CardHeader className={'flex flex-row items-center gap-x-4 p-7 space-y-0'}>
                <Button variant={'secondary'} size={'sm'} asChild>
                    <Link href={Routes.workspaceIdPath(workspaceId)}>
                        <ArrowLeftIcon className={'size-4 mr-2'}/>Back
                    </Link>
                </Button>
                <CardTitle className={'text-xl font-bold'}>Members list</CardTitle>
            </CardHeader>

            <div className={'px-7'}>
                <DottedSeparator/>
            </div>

            <CardContent className={'p-7'}>
                {data?.documents.map(function (member, index) {
                    const isCurrentUser = member.userId === user.$id;

                    return (
                        <Fragment key={member.$id}>
                            <div className={'flex items-center gap-2'}>
                                <MemberAvatar name={member.name} className={'size-10'} fallbackClassName={'text-lg'}/>
                                <div className={'flex flex-col'}>
                                    <p className={'text-sm font-medium'}>{member.name}</p>
                                    <p className={'text-xs text-muted-foreground'}>{member.email}</p>
                                    {/*<p className={'text-destructive text-xs'}>{member.role}</p>*/}
                                    {/*<span className={'text-xs text-neutral-500'}>{member.userId} {user.$id}</span>*/}
                                    {/*<p className={'text-primary text-xs'}>{isCurrentUser ? 'Current' : 'Not Current'}</p>*/}
                                    {/*<p className={'text-primary text-xs'}>currentUserRole - {(currentUserRole === MemberRole.ADMIN).toString()}</p>*/}
                                </div>

                                {
                                    (!isCurrentUser && currentUserRole === MemberRole.ADMIN) && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant={'secondary'} size={'icon'} className={'ml-auto'}>
                                                    <MoreVerticalIcon className={'size-4 text-muted-foreground'}/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side={'bottom'}>
                                                {member.role !== MemberRole.ADMIN && (
                                                    <DropdownMenuItem className={'font-medium'} disabled={isUpdatingMember} onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}>
                                                        Set as Administrator
                                                    </DropdownMenuItem>
                                                )}
                                                {member.role !== MemberRole.MEMBER && (
                                                    <DropdownMenuItem className={'font-medium'} disabled={isUpdatingMember} onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}>
                                                        Set as Member
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className={'font-medium text-destructive'} disabled={isDeletingMember} onClick={() => handleDeleteMember(member.$id)}>
                                                    Remove {member.name}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )
                                }
                            </div>
                            {index < data.documents.length - 1 && (
                                <Separator className={'my-2.5'}/>
                            )}
                        </Fragment>
                    );
                })}
            </CardContent>
        </Card>
    );
}

export default MembersList;
