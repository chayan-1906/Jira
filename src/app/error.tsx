'use client';

import {AlertTriangle} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Routes from "@/utils/Routes";

function ErrorPage() {
    return (
        <div className={'flex flex-col items-center justify-center gap-y-2 h-full'}>
            <AlertTriangle className={'size-8 text-destructive'}/>
            <p className={'text-sm text-muted-foreground'}>Something went wrong</p>
            <Button variant={'secondary'}>
                <Link href={Routes.homePath}>Back to Home</Link>
            </Button>
        </div>
    );
}

export default ErrorPage;
