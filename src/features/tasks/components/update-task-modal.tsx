'use client';

import React from "react";
import ResponsiveModal from "@/components/responsive-modal";
import {useUpdateTaskModal} from "@/features/tasks/hooks/use-update-task-modal";
import UpdateTaskFormWrapper from "@/features/tasks/components/update-task-form-wrapper";

function UpdateTaskModal({}) {
    const {taskId, close} = useUpdateTaskModal();

    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {taskId && (
                <UpdateTaskFormWrapper id={taskId} onCancel={close}/>
            )}
        </ResponsiveModal>
    );
}

export default UpdateTaskModal;
