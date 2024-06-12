import {type ComponentType, lazy} from "react";

export const CreateClusterRequestAsync = lazy<ComponentType>(
    async () => await import('./CreateClusterRequest.tsx')
        .then((module) => ({default: module.CreateClusterRequest})),
);
