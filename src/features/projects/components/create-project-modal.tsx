'use client';

import React from "react";
import ResponsiveModal from "@/components/responsive-modal";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";
import CreateProjectForm from "@/features/projects/components/create-project-form";

function CreateProjectModal({}) {
    const {isOpen, close, setIsOpen} = useCreateProjectModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateProjectForm onCancel={close}/>
        </ResponsiveModal>
    );
}

export default CreateProjectModal;
