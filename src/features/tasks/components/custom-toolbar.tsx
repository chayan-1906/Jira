import {CustomToolbarProps} from "@/types";
import {Button} from "@/components/ui/button";
import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";

function CustomToolbar({date, onNavigate}: CustomToolbarProps) {
    return (
        <div className={'flex mb-4 gap-x-2 items-center justify-center lg:justify-start w-full lg:w-auto'}>
            <Button variant={'secondary'} size={'icon'} className={'flex items-center'} onClick={()=>onNavigate('PREV')}>
                <ChevronLeftIcon className={'size-4'}/>
            </Button>
            <div className={'flex items-center justify-center w-full lg:w-auto border border-input rounded-md px-3 py-2 h-8'}>
                <CalendarIcon className={'size-4 mr-2'}/>
                <p className={'text-sm'}>{format(date, 'MMMM yyyy')}</p>
            </div>
            <Button variant={'secondary'} size={'icon'} className={'flex items-center'} onClick={()=>onNavigate('NEXT')}>
                <ChevronRightIcon className={'size-4'}/>
            </Button>
        </div>
    );
}

export default CustomToolbar;
