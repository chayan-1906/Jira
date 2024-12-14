import {MembersListProps} from "@/types";
import {Button} from "@/components/ui/button";
import {SettingsIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import Link from "next/link";
import Routes from "@/utils/Routes";
import {Card, CardContent} from "@/components/ui/card";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import MemberAvatar from "@/features/members/components/member-avatar";

function WorkspaceMembersList({members, total}: MembersListProps) {
    const workspaceId = useWorkspaceId();

    return (
        <div className={'flex flex-col gap-y-4 col-span-1'}>
            <div className={'bg-white border rounded-lg p-4'}>
                <div className={'flex items-center justify-between'}>
                    <p className={'text-lg font-semibold'}>Members ({total})</p>
                    <Button variant={'secondary'} size={'icon'} asChild>
                        <Link href={Routes.membersPath(workspaceId)}>
                            <SettingsIcon className={'size-4'}/>
                        </Link>
                    </Button>
                </div>
                <DottedSeparator className={'my-4'}/>
                <ul className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
                    {members.map((member) => {
                        const {$id, name, email} = member || {};

                        return (
                            <li key={$id}>
                                <Card className={'shadow-none rounded-lg overflow-hidden'}>
                                    <CardContent className={'flex flex-col items-center gap-2 p-3'}>
                                        <MemberAvatar name={name} className={'size-12'}/>
                                        <div className={'flex flex-col items-center w-full'}>
                                            <p className={'font-normal sm:font-medium text-sm sm:text-base line-clamp-1'}>{name}</p>
                                            <p className={'w-full text-center text-xs sm:text-sm text-muted-foreground overflow-hidden'}>{email}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </li>
                        );
                    })}
                    <li className={'text-sm text-muted-foreground text-center hidden first-of-type:block'}>No members found</li>
                </ul>
            </div>
        </div>
    );
}

export default WorkspaceMembersList;
