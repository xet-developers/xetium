import {type ComponentType, lazy} from "react";

export const ResultClusterTableAsync = lazy<ComponentType>(
    async () => await import('./ResultClusterTable.tsx')
        .then((module) => ({default: module.ResultClusterTable})),
);
