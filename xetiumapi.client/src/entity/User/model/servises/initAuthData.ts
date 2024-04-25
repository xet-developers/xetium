import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../types/IUserSliceSchema.ts";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage.ts";
import {ThunkConfig} from "@/app/providers/StoreProvaider/config/StateSchema.ts";
import {getUserDataQuery} from "../../api/User.api.ts";


export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'initAuthData',
    // @ts-ignore
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (!userId) {
            return rejectWithValue('');
        }

        try {
            return await dispatch(getUserDataQuery()).unwrap();
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);
