import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider/config/StateSchema'
import {__UserData__} from 'shared/const/constants'

import {ProfileSchema} from '../../models/types/ProfileSchema'

export const fetchUserData = createAsyncThunk<ProfileSchema, void, ThunkApi>('profile/fetchUserData',async (_, thunkApi) => {
    const {
        rejectWithValue,
        extra: {
            api
        }
    } = thunkApi
    try {
        const response = await api.get<ProfileSchema>('profile', {
            headers: {
                authorization: localStorage.getItem(__UserData__)
            }
        })
        return response.data
    } catch (e) {
        return rejectWithValue('fetch profile failed')
    }
})