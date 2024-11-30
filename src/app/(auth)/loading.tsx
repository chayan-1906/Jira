import {Loader} from "lucide-react";

function LoadingPage() {
    return (
        <div className={'flex flex-col items-center justify-center gap-y-2 h-full'}>
            <Loader className={'size-6 animate-spin text-muted-foreground'}/>
        </div>
    )
}

export default LoadingPage;
