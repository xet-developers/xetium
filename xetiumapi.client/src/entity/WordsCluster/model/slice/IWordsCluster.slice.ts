import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IWordsClusterSliceSchema} from '../types/IWordsClusterSliceSchema'


const initialState: IWordsClusterSliceSchema = {
    test: ''
};

export const WordsClusterSlice = createSlice({
    name: 'WordsCluster',
    initialState,
    reducers: {
        testReducer: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: WordsClusterSliceActions} = WordsClusterSlice;
export const {reducer: WordsClusterSliceReducer} = WordsClusterSlice;
