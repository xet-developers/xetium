import {type ComponentType, lazy} from "react";

export const ResultCheckTableAsync = lazy<ComponentType>(
    async () => await import('./ResultCheckTable.tsx')
        .then((module) => ({default: module.ResultCheckTable})),
);
