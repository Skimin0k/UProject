import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {getProfileForm} from '../../models/selectors/getProfileForm'
import {Profile, ValidateDataErrors} from '../../models/types/ProfileSchema'

import {validateProfileData} from './validateProfileData'

export const updateProfileData = createAsyncThunk<Profile, void, ThunkApi<ValidateDataErrors[]>>
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
        const errors = validateProfileData(profile)
        if(!profile) throw new Error()
        if(errors.length) return rejectWithValue(errors)
        const response = await api.put<Profile>('profile/'+profile.id, profile)
        return response.data
    } catch (e) {
        return rejectWithValue([ValidateDataErrors.NO_DATA])
    }
})