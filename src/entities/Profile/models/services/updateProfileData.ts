import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {getProfileForm} from '../../models/selectors/getProfileForm'
import {Profile} from '../../models/types/ProfileSchema'

export const updateProfileData = createAsyncThunk<Profile, void, ThunkApi>
('profile/updateProfileData',async (data, thunkApi) => {
    const {
        rejectWithValue,
        extra: {
            api,
        },
        getState
    } = thunkApi
    try {
        const profile = getProfileForm(getState())
        const response = await api.post<Profile>('profile', profile)
        return response.data
    } catch (e) {
        return rejectWithValue('failed to update profile')
    }
})