import {
    type UnknownAction,
    combineReducers,
    type Reducer,
} from '@reduxjs/toolkit';

import {
    type StateSchemaKeys,
    type ReducerManager,
    type MountedReducers,
} from './StateSchema';

export function createReducerManager(
    initialReducers: any,
): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);


    let keysToRemove: StateSchemaKeys[] = [];
    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,

        reduce: (state: any, action: UnknownAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                for (const key of keysToRemove) {
                    delete state[key];
                }
                keysToRemove = [];
            }

            return combinedReducer(state, action);
        },

        add: (key: StateSchemaKeys, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            mountedReducers[key] = true;

            combinedReducer = combineReducers(reducers);
        },

        remove: (key: StateSchemaKeys) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);
            mountedReducers[key] = false;

            combinedReducer = combineReducers(reducers);
        },
    };
}
