import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {User} from 'entities/user'
import {userActions} from 'entities/user/slices/userSlice'
import {AuthSchema} from 'feature/Authorization'

export const submitUserAuthData =
    createAsyncThunk('auth/submitUserAuthData', async (authData: AuthSchema, thunkAPI) => {
        try {
            const response =  await axios.post<User>('http://localhost:8000/login', authData)
            thunkAPI.dispatch(userActions.setAuthData(response.data))
        } catch (e) {
            return thunkAPI.rejectWithValue('something goes wrong')
        }
    })