import {type ComponentType, lazy} from "react";

export const ResultReportTableAsync = lazy<ComponentType>(
    async () => await import('./ResultReportTable.tsx')
        .then((module) => ({default: module.ResultReportTable})),
);
