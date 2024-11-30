import {Loader} from "lucide-react";

function LoadingPage() {
    return (
        <div className={'flex flex-col items-center justify-center gap-y-2 min-h-screen'}>
            <Loader className={'size-6 animate-spin text-muted-foreground'}/>
        </div>
    )
}

export default LoadingPage;
