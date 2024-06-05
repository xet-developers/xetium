import {type ComponentType, lazy} from "react";

export const ResultGenerationAsync = lazy<ComponentType>(
    async () => await import('./ResultGeneration.tsx')
        .then((module) => ({default: module.ResultGeneration})),
);
