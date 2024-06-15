import {ComponentType, lazy} from "react";
import {IDeleteModalProps} from "@/shared/ui/components/DeleteModal/ui/DeleteModal.tsx";

export const DeleteModalAsync = lazy<ComponentType<IDeleteModalProps>>(
    async () => await import('./DeleteModal')
    .then((module) => ({ default: module.DeleteModal })),
);