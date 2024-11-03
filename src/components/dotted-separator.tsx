import {DottedSeparatorProps} from "@/types";
import {cn} from "@/lib/utils";

function DottedSeparator({className, color = '#D4D4D8', height = '2px', dotSize = '2px', gapSize = '6px', direction = 'horizontal'}: DottedSeparatorProps) {
    const isHorizontal = direction === 'horizontal';

    return (
        <div className={cn(isHorizontal ? 'flex w-full items-center' : 'flex flex-col h-full items-center', className)}>
            <div className={isHorizontal ? 'flex-grow' : 'flex-grow-0'}
                 style={{
                     width: isHorizontal ? '100%' : height,
                     height: isHorizontal ? height : '100%',
                     backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
                     backgroundSize: isHorizontal ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}` : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
                     backgroundRepeat: isHorizontal ? 'repeat-x' : 'repeat-y',
                     backgroundPosition: 'center',
                 }}
            />
        </div>
    );
}

export default DottedSeparator;
