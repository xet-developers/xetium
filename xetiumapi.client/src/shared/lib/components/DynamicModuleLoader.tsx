import { useEffect, type FC, type ReactNode } from 'react';

import { type Reducer } from '@reduxjs/toolkit';
import { useDispatch, useStore } from 'react-redux';

import { type ReduxStoreWithManager } from '@/app/providers/StoreProvaider';
import {
    type StateSchema,
    type StateSchemaKeys,
} from '@/app/providers/StoreProvaider/config/StateSchema';

export type ReducersList = {
    [name in StateSchemaKeys]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeOnUnmount?: boolean;
    children: ReactNode;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeOnUnmount = true } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();

        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKeys];
            // Добавляем новый редюсер только если его нет
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKeys, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });
        return () => {
            if (!removeOnUnmount) return;
            Object.keys(reducers).forEach((name) => {
                store.reducerManager.remove(name as StateSchemaKeys);
                dispatch({ type: `@DESTROY ${name} reducer` });
            });
        };
    }, []);

    return <>{children}</>;
};
