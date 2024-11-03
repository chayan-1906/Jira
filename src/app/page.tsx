import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

function Home() {
    return (
        <div className={'flex flex-col gap-3 p-3'}>
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
