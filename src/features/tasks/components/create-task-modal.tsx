'use client';

import React from "react";
import ResponsiveModal from "@/components/responsive-modal";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import CreateTaskFormWrapper from "@/features/tasks/components/create-task-form-wrapper";

function CreateTaskModal({}) {
    const {isOpen, close, setIsOpen} = useCreateTaskModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateTaskFormWrapper onCancel={close}/>
        </ResponsiveModal>
    );
}

export default CreateTaskModal;
