import {StateSchema} from "@/app/providers/StoreProvaider";

export const currentProjectId = (state: StateSchema) => state.project?.currentProjectId
