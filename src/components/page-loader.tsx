'use client';

import {Loader} from "lucide-react";
import {cn} from "@/lib/utils";

function PageLoader({className}: {className?: string}) {
    return (
        <div className={cn('flex items-center justify-center h-[80%]', className)}>
            <Loader className={'size-6 animate-spin text-muted-foreground'}/>
        </div>
    );
}

export default PageLoader;
