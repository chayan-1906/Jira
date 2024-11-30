import {DatePickerProps} from "@/types";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";

export const DatePicker = ({value, onChange, clasName, placeholder = 'Select date'}: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'outline'} size={'lg'} className={cn('w-full justify-start text-left font-normal px-3', !value && 'text-muted-foreground', clasName)}>
                    <CalendarIcon className={'mr-2 h-4 w-4'}/>
                    {value ? format(value, 'PPP') : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={'w-auto p-0'}>
                <Calendar mode={'single'} selected={value} onSelect={(date) => onChange(date as Date)} initialFocus/>
            </PopoverContent>
        </Popover>
    );
}
