import React from 'react';
import { useDeleteCheckModalMutation } from "./api/deleteCheckModal.api";
import {DeleteModal} from "@/shared/ui/components/DeleteModal/ui/DeleteModal.tsx";

export interface IDeleteCheckModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    jobId: string;
    taskId: string;
}

export const DeleteCheckModal = ({ open, setOpen, jobId, taskId }: IDeleteCheckModalProps): React.JSX.Element => {

    const [trigger] = useDeleteCheckModalMutation()

    const deleteCheck = async () => {
        await trigger({
            jobId: jobId,
            taskId: taskId
        })
    };

    return (
        <DeleteModal open={open} functionDelete={deleteCheck} setOpen={setOpen}/>
    );
};
