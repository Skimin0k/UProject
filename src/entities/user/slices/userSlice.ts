import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UserSchema} from 'entities/user/types/UserSchema'

const initialState: UserSchema = {}

const UserSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        initAuthData: (state) => {
            const user = localStorage.getItem('user')
            if (user) {
                state.authData = JSON.parse(user)
            }
        },
        logout: () => {
            localStorage.removeItem('user')
        },
    }
})
export const {
    reducer: userReducer,
    actions: userActions
} =  UserSlice
