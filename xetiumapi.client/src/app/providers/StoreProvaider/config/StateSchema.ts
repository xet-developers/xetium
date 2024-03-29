import {
    type UnknownAction,
    type EnhancedStore,
    type Reducer,
    type ReducersMapObject,
} from '@reduxjs/toolkit';
import { type rtkApi } from '@/shared/api/rtkApi';
import type {IRegisterFormSchema} from '@/features/RegisterForm'

export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    //async
    registerForm?: IRegisterFormSchema;
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

