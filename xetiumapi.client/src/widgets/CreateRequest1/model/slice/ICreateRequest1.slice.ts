import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {ICreateRequest1SliceSchema, ICreateRequestResp} from '../types/ICreateRequest1SliceSchema'


const initialState: ICreateRequest1SliceSchema = {
};

export const CreateRequest1Slice = createSlice({
    name: 'CreateRequest1',
    initialState,
    reducers: {
        setIntends: (state, action: PayloadAction<ICreateRequestResp>) => {
            state.intends = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: CreateRequest1SliceActions} = CreateRequest1Slice;
export const {reducer: CreateRequest1SliceReducer} = CreateRequest1Slice;
