import {
    type UnknownAction,
    type EnhancedStore,
    type Reducer,
    type ReducersMapObject,
} from '@reduxjs/toolkit';
import { type rtkApi } from '@/shared/api/rtkApi';
import type {IRegisterFormSchema} from '@/features/RegisterForm'
import {IAuthorizationFormSliceSchema} from "@/features/AuthorizationForm/model/types/IAuthorizationFormSliceSchema.ts";
import {IUserSliceSchema} from "@/entity/User";
import {ICreateProjectSliceSchema} from "@/features/CreateProject";
import {IProjectSliceSchema} from "@/entity/Project";

export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    user: IUserSliceSchema;
    //async
    project: IProjectSliceSchema
    registerForm?: IRegisterFormSchema;
    authorizationForm?: IAuthorizationFormSliceSchema;
    createProject?: ICreateProjectSliceSchema
}

export type StateSchemaKeys = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKeys, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: UnknownAction) => any;
    add: (key: StateSchemaKeys, reducer: Reducer) => void;
    remove: (key: StateSchemaKeys) => void;
    // true - вмонтирован, false - демонтирован
    getMountedReducers: () => MountedReducers;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkConfig<T>{
    state: StateSchema
    extra?: unknown
    rejectValue?: T
}
