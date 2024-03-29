import {FC, ReactNode} from 'react';
import { Provider } from 'react-redux';
import {createStore} from "../config/store.ts";

interface StoreProviderProps {
    children: ReactNode;
    // initialState?: DeepPartial<StateSchema>;
    // asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
    const {children} = props

    const store = createStore(
        // initialState as StateSchema,
        // asyncReducers as ReducersMapObject<StateSchema>,
    )

    return (
        <Provider store={store}>{children}</Provider>
    );
};

