import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAddKeyWordsSliceSchema, ISitePosition} from '../types/IAddKeyWordsSliceSchema';

const initialState: IAddKeyWordsSliceSchema = {
    sitePositionCheck: []
};

export const addKeyWordsSlice = createSlice({
    name: 'createProject',
    initialState,
    reducers: {
        setSitePositionCheck(state, action: PayloadAction<ISitePosition[]>){
            state.sitePositionCheck = action.payload
        }
    },
});

export const {actions: addKeyWordsSliceActions} = addKeyWordsSlice;
export const {reducer: addKeyWordsSliceReducer} = addKeyWordsSlice;

