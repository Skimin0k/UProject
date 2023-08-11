import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider/config/StateSchema'
import {User} from 'entities/user'
import {userActions} from 'entities/user/slices/userSlice'
import {AuthSchema} from 'feature/Authorization'

interface LoginUserAuthData {
    password: string,
    username: string
}
export const submitUserAuthData =
    createAsyncThunk<User,LoginUserAuthData, ThunkApi >('auth/submitUserAuthData', async (authData: AuthSchema, thunkAPI) => {
        try {
            const response = await thunkAPI.extra.api.post<User>('login', authData)
            thunkAPI.dispatch(userActions.setAuthData(response.data))
            thunkAPI.extra.navigate('profile')
        } catch (e) {
            return thunkAPI.rejectWithValue('something goes wrong')
        }
    })