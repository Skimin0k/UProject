import {configureStore, ReducersMapObject} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'
import {counterReducer} from 'entities/Counter'
import {userReducer} from 'entities/user/slices/userSlice'
import {authReducer} from 'feature/Authorization'

export const configureReduxStore = (initialState: StateSchema) => {
    const rootReducer : ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        auth: authReducer,
        user: userReducer
    }
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState
    })
}

export class RootState {
}