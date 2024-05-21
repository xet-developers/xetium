import {ComponentType, lazy} from "react";
import { IRegisteredLayoutProps } from "./RegisteredLayout.tsx";

export const RegisteredLayoutAsync = lazy<ComponentType<IRegisteredLayoutProps>>(
    async () => await import('./RegisteredLayout.tsx')
        .then((module) => ({default: module.RegisteredLayout})),
);
