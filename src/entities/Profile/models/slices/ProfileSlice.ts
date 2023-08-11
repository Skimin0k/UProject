import {createSlice} from '@reduxjs/toolkit'
import {fetchUserData} from 'entities/Profile/models/services/fetchUserData'

import {ProfileSchema} from '../types/ProfileSchema'

const initialState: ProfileSchema = {
    age: 0,
    avatar: '',
    city: '',
    country: '',
    currency: '',
    first: '',
    lastname: '',
    username: '',

    isLoading: false
}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{

    },
    extraReducers: builder => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchUserData.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(fetchUserData.fulfilled, (state: ProfileSchema, action) => {
            Object.assign(state, action.payload)
            state.isLoading = false
        })
    }
})
export const {
    reducer: profileReducer,
    actions: profileActions
} = ProfileSlice
