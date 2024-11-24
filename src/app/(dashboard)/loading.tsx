import {Loader} from "lucide-react";

function Loading() {
    return (
        <div className={'flex items-center justify-center h-full'}>
            <Loader className={'size-6 animate-spin text-muted-foreground'}/>
        </div>
    );
}

export default Loading;
