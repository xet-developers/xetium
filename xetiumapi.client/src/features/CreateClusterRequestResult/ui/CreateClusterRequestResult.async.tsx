import {type ComponentType, lazy} from "react";

export const CreateClusterRequestResultAsync = lazy<ComponentType>(
    async () => await import('./CreateClusterRequestResult.tsx')
        .then((module) => ({default: module.CreateClusterRequestResult})),
);
