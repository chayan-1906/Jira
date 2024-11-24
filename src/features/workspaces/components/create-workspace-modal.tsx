'use client';

import React from "react";
import ResponsiveModal from "@/components/responsive-modal";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import {useCreateWorkspaceModal} from "@/features/workspaces/hooks/use-create-workspace-modal";

function CreateWorkspaceModal({}) {
    const {isOpen, close, setIsOpen} = useCreateWorkspaceModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close}/>
        </ResponsiveModal>
    );
}

export default CreateWorkspaceModal;
