import { configureStore } from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'
import {counterReducer} from 'entities/Counter'

export const configureReduxStore = (initialState: StateSchema) => {
    return configureStore({
        reducer: {
            counter: counterReducer
        },
        preloadedState: initialState
    })
}

export class RootState {
}