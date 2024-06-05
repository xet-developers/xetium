import {type ComponentType, lazy} from "react";

export const ProjectInformationAsync = lazy<ComponentType>(
    async () => await import('./ProjectInformation.tsx')
        .then((module) => ({default: module.ProjectInformation})),
);
