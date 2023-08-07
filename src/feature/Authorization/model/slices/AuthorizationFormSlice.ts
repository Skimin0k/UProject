import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {submitUserAuthData} from 'feature/Authorization/model/services/submitUserAuthData'

import {AuthSchema} from '../types/AuthSchema'

const initialState: AuthSchema = {
    isLoading: false,
    username: '',
    password: ''
}

const AuthorizationFormSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setUsername: (state, action: PayloadAction<string> ) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string> ) => {
            state.password = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(submitUserAuthData.pending, (state) => {
            state.error = undefined
            state.isLoading = true
        })
        builder.addCase(submitUserAuthData.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(submitUserAuthData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
    }
})
export const {
    reducer: authReducer,
    actions: authActions
} =  AuthorizationFormSlice
