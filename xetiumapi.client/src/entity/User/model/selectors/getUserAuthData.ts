import {StateSchema} from "@/app/providers/StoreProvaider";

export const getUserAuthData = (state: StateSchema) => state.user?.authData

export const getInitializedUser = (state: StateSchema) => state.user?.initialized

