import { NavigateFunction } from 'react-router-dom'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {User, userActions} from 'entities/User'

interface LoginUserAuthData {
    password: string,
    username: string
}
interface SubmitUserAuthDataProps {
    authData: LoginUserAuthData,
    navigate: NavigateFunction
}

export const submitUserAuthData =
    createAsyncThunk<User, SubmitUserAuthDataProps, ThunkApi<string>
    >('auth/submitUserAuthData', async (
        {authData, navigate},
        thunkAPI
    ) => {
        try {

            const response = await thunkAPI.extra.api.post<User>('login', authData)
            thunkAPI.dispatch(userActions.setAuthData(response.data))

            navigate?.('profile/'+ response.data?.id)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('something goes wrong')
        }
    })