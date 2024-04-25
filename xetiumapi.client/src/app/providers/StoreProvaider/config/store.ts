import {configureStore, type ReducersMapObject} from '@reduxjs/toolkit';
import {rtkApi} from "@/shared/api/rtkApi.ts";
import {StateSchema} from "@/app/providers/StoreProvaider";
import {createReducerManager} from "@/app/providers/StoreProvaider/config/reducerManager.ts";
import {UserSliceReducer} from "@/entity/User";


export const createStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) => {

    const rootReducers = {
        ...asyncReducers,
        user: UserSliceReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(rtkApi.middleware),
    });

    // @ts-expect-error
    store.reducerManager = reducerManager;

    return store
}


export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
