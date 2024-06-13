import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {ISitePositionTableSliceSchema} from '../types/ISitePositionTableSliceSchema'


const initialState: ISitePositionTableSliceSchema = {
    test: ''
};

export const SitePositionTableSlice = createSlice({
    name: 'SitePositionTable',
    initialState,
    reducers: {
        testReducer: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: SitePositionTableSliceActions} = SitePositionTableSlice;
export const {reducer: SitePositionTableSliceReducer} = SitePositionTableSlice;
