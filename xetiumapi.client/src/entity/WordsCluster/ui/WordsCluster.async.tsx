import {ComponentType, lazy} from "react";

export const WordsClusterAsync = lazy<ComponentType>(
    async () => await import('./WordsCluster')
        .then((module) => ({default: module.WordsCluster})),
);
