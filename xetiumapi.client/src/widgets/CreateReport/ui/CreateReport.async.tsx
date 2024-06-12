import {type ComponentType, lazy} from "react";

export const CreateReportAsync = lazy<ComponentType>(
    async () => await import('./CreateReport.tsx')
        .then((module) => ({default: module.CreateReport})),
);
