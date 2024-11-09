'use client';

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useCurrent} from "@/features/auth/api/use-current";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Routes from "@/utils/Routes";
import {useLogout} from "@/features/auth/api/use-logout";

function Home() {
    const router = useRouter();
    const {data, isLoading} = useCurrent();
    const {mutate} = useLogout();

    useEffect(() => {
        if (!data && !isLoading) {
            router.push(Routes.signInPath);
        }
    }, [data, isLoading, router]);

    return (
        <div className={'flex flex-col gap-3 p-3'}>
            <p>Only visible to authorized user</p>
            <Button variant={'destructive'} onClick={() => mutate()}>Logout</Button>
            <div className={'flex h-full justify-center items-center gap-3 p-3'}>
                <Button variant={'primary'} size={'lg'}>Primary</Button>
                <Button variant={'secondary'}>Secondary</Button>
                <Button variant={'destructive'} size={'sm'}>Destructive</Button>
                <Button variant={'ghost'}>Ghost</Button>
                <Button variant={'muted'} size={'xs'}>Muted</Button>
                <Button variant={'outline'} disabled>Outline</Button>
                <Button variant={'tertiary'}>Tertiary</Button>
            </div>
            <Input/>
        </div>
    );
}

export default Home;
