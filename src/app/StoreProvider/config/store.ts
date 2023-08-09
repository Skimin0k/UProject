import {configureStore, ReducersMapObject} from '@reduxjs/toolkit'
import {createReducerManager} from 'app/StoreProvider/config/ReducerManager'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'
import {counterReducer} from 'entities/Counter'
import {userReducer} from 'entities/user/slices/userSlice'

export const configureReduxStore = (initialState?: StateSchema, asyncReducers?:ReducersMapObject<StateSchema>) => {
    const rootReducer : ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        // асинхронные редюсеры

        counter: counterReducer,
        user: userReducer,
    }

    const reducerManager = createReducerManager(rootReducer)

    const store = configureStore({
        reducer: reducerManager.reduce,
        preloadedState: initialState
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export class RootState {
}