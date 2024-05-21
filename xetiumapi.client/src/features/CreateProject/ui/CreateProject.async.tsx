import {ComponentType, lazy} from "react";
import {ICreateProjectProps} from "@/features/CreateProject/ui/CreateProject.tsx";

export const CreateProjectAsync = lazy<ComponentType<ICreateProjectProps>>(
    async () => await import('./CreateProject')
        .then((module) => ({default: module.CreateProject})),
);
