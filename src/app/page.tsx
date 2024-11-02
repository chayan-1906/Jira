import {Button} from "@/components/ui/button";

function Home() {
    return (
        <div className={'flex h-full justify-center items-center bg-red-400 gap-3 p-3'}>
            <p className={'font-black'}>Home Page</p>
            <Button variant={'outline'}>Hello</Button>
        </div>
    );
}

export default Home;
