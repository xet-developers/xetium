import {type ComponentType, lazy} from "react";

export const ClustersAsync = lazy<ComponentType>(
    async () => await import('./Clusters.tsx')
        .then((module) => ({default: module.Clusters})),
);
