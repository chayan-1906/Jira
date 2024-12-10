import {AnalyticsCardProps} from "@/types";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {cn} from "@/lib/utils";

function AnalyticsCard({title, value, variant, increaseValue}: AnalyticsCardProps) {
    const isUp = variant === 'up';
    const color = isUp ? 'text-emerald-500' : 'text-red-500';
    const iconColor = color;
    const increaseValueColor = color;
    const Icon = isUp ? FaCaretUp : FaCaretDown;

    return (
        <Card className={'shadow-none border-none w-full'}>
            <CardHeader>
                <div className={'flex items-center gap-x-2.5'}>
                    <CardDescription className={'flex items-center gap-x-2 font-medium overflow-hidden'}>
                        <span className={'truncate text-base'}>{title}</span>
                    </CardDescription>
                    <div className={'flex items-center gap-x-1'}>
                        <Icon className={cn(iconColor, 'size-4')}/>
                        <span className={cn(increaseValueColor, 'truncate text-base font-medium')}>{increaseValue}</span>
                    </div>
                </div>
                <CardTitle className={'text-3xl font-semibold'}>{value}</CardTitle>
            </CardHeader>
        </Card>
    );
}

export default AnalyticsCard;
