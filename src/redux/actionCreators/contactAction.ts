import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiConfig} from "../../api/apiConfig";
import {IContacts} from "../../types/contactType";

export const contactAction = createAsyncThunk(
    'contactAction',
    async (_, thunkAPI) => {
        try {
            const response = await apiConfig.get<IContacts[]>('/users')
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Error')
        }
    }
)

export const removeContactAction = createAsyncThunk(
    'contactAction',
    async (id: number, thunkAPI) => {
        try {
            const response = await apiConfig.delete<IContacts[]>(`/users/${id}`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Error')
        }
    }
)

