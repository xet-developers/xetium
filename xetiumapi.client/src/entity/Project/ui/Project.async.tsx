import {ComponentType, lazy} from "react";

export const ProjectAsync = lazy<ComponentType>(
    async () => await import('./Project')
    .then((module) => ({ default: module.Project })),
);
