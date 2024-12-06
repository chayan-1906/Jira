import {parseAsBoolean, useQueryState} from "nuqs";
import {TaskStatus} from "@/features/tasks/types";

export const useCreateTaskModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        'create-task',
        parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true}),
    );

    const open = (initialStatus: TaskStatus) => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {isOpen, open, close, setIsOpen};
}
