'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {JoinWorkspaceFormProps} from "@/types";
import DottedSeparator from "@/components/dotted-separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Routes from "@/utils/Routes";
import {useJoinWorkspace} from "@/features/workspaces/api/use-join-workspace";
import {useInviteCode} from "@/features/workspaces/hooks/use-invite-code";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useRouter} from "next/navigation";

function JoinWorkspaceForm({initialValues, workspaceId, inviteCode}: JoinWorkspaceFormProps) {
    const {mutate, isPending} = useJoinWorkspace();
    // const workspaceId = useWorkspaceId();
    // const inviteCode = useInviteCode();
    const router = useRouter();

    const onSubmit = () => {
        mutate({
            param: {workspaceId},
            json: {code: inviteCode},
        }, {
            onSuccess: ({data}) => {
                router.push(Routes.workspaceIdPath(data.$id));
            }
        });
    }

    return (
        <Card className={'w-full h-full border-none shadow-none'}>
            <CardHeader className={'p-7'}>
                <CardTitle className={'text-xl font-bold'}>Join Workspace</CardTitle>
                <CardDescription>You&apos;ve been invited to join <strong>{initialValues.name}</strong> workspace</CardDescription>
            </CardHeader>

            <div className={'px-7'}>
                <DottedSeparator/>
            </div>

            <CardContent className={'p-7'}>
                <div className={'flex flex-col lg:flex-row gap-y-2 items-center justify-between'}>
                    <Button variant={'secondary'} type={'button'} asChild disabled={isPending} className={'w-full lg:w-fit'}>
                        <Link href={Routes.homePath}>Cancel</Link>
                    </Button>
                    <Button type={'button'} disabled={isPending} onClick={onSubmit} className={'w-full lg:w-fit'}>Join Workspace</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default JoinWorkspaceForm;
