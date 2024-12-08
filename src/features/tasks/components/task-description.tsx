import {TaskDescriptionProps} from "@/types";
import {Button} from "@/components/ui/button";
import {PencilIcon, XIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import {useCallback, useState} from "react";
import {useUpdateTask} from "@/features/tasks/api/use-update-task";
import {Textarea} from "@/components/ui/textarea";

function TaskDescription({task}: TaskDescriptionProps) {
    const {$id, description} = task || {};
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(description || '');

    const {mutate, isPending} = useUpdateTask();

    const handleSave = useCallback(() => {
        mutate({
            json: {description: value},
            param: {taskId: $id},
        }, {
            onSuccess: () => {
                setIsEditing((prev) => !prev);
            },
        });
    }, [$id, mutate, value]);

    return (
        <div className={'p-4 rounded-lg border'}>
            <div className={'flex items-center justify-between'}>
                <p className={'text-lg font-semibold'}>Overview</p>
                <Button variant={'secondary'} size={'sm'} onClick={() => setIsEditing((prev) => !prev)}>
                    {isEditing ? (
                        <XIcon className={'size-4 mr-2'}/>
                    ) : (
                        <PencilIcon className={'size-4 mr-2'}/>
                    )}
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <DottedSeparator className={'my-4'}/>
            {isEditing ? (
                <div className={'flex flex-col gap-y-4'}>
                    <Textarea placeholder={'Add a description...'} value={value} rows={4} onChange={(e) => setValue(e.target.value)} disabled={isPending}/>
                    <Button size={'sm'} className={'w-fit ml-auto'} disabled={isPending} onClick={handleSave}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
                </div>
            ) : (
                <div className={'flex flex-col gap-y-4 text-sm'}>
                    {description || (
                        <span>No description set</span>
                    )}
                </div>
            )}
        </div>
    );
}

export default TaskDescription;
