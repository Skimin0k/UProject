import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {User, userActions} from 'entities/User'

interface LoginUserAuthData {
    password: string,
    username: string
}

export const submitUserAuthData =
    createAsyncThunk<User, LoginUserAuthData, ThunkApi
    >('auth/submitUserAuthData', async (
        authData,
        thunkAPI
    ) => {
        try {
            const response = await thunkAPI.extra.api.post<User>('login', authData)
            thunkAPI.dispatch(userActions.setAuthData(response.data))
            thunkAPI.extra.navigate?.('profile')
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('something goes wrong')
        }
    })