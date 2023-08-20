import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {__UserData__} from 'shared/const/constants'

import {User, UserSchema} from '../types/UserSchema'

const initialState: UserSchema = {}

const UserSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
            localStorage.setItem(__UserData__, JSON.stringify(action.payload))
        },
        initAuthData: (state) => {
            const user = localStorage.getItem('user')
            if (user) {
                state.authData = JSON.parse(user)
            }
        },
        logout: () => {
            localStorage.removeItem(__UserData__)
        },
    }
})
export const {
    reducer: userReducer,
    actions: userActions
} =  UserSlice
