import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {__UserData__} from 'shared/const/constants'

import {Profile} from '../../models/types/ProfileSchema'

export const fetchUserData = createAsyncThunk<Profile, void, ThunkApi>
('profile/fetchUserData',async (_, thunkApi) => {
    const {
        rejectWithValue,
        extra: {
            api
        }
    } = thunkApi
    try {
        const response = await api.get<Profile>('profile', {
            headers: {
                authorization: localStorage.getItem(__UserData__)
            }
        })
        return response.data
    } catch (e) {
        return rejectWithValue('fetch profile failed')
    }
})