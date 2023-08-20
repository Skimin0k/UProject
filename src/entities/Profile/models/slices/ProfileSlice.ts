import {createSlice, DeepPartial, PayloadAction} from '@reduxjs/toolkit'

import {fetchUserData} from '../../models/services/fetchUserData'
import {updateProfileData} from '../../models/services/updateProfileData'
import {Profile, ProfileSchema} from '../types/ProfileSchema'

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        updateProfile:(state, action: PayloadAction<DeepPartial<Profile>>) => {
            Object.assign(state.form || {}, action.payload)
        },
        edit: (state) => {
            state.readonly = false
        },
        cancelEdit: (state) => {
            state.readonly = true
            state.form = JSON.parse(JSON.stringify(state.data))
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(fetchUserData.fulfilled, (state: ProfileSchema, action) => {
            state.form = action.payload
            state.data = action.payload
            state.isLoading = false
        })
        builder.addCase(updateProfileData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateProfileData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(updateProfileData.fulfilled, (state: ProfileSchema, action) => {
            state.isLoading = false
            state.form = action.payload
            state.data = action.payload
        })
    }
})
export const {
    reducer: profileReducer,
    actions: profileActions
} = ProfileSlice
