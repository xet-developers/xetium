import {type ComponentType, lazy} from "react";

export const ResultsLastAsync = lazy<ComponentType>(
    async () => await import('./ResultsLast.tsx')
        .then((module) => ({default: module.ResultsLast})),
);
