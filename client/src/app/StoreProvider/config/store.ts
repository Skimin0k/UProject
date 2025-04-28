import {useDispatch} from 'react-redux'
import {CombinedState, configureStore, ReducersMapObject} from '@reduxjs/toolkit'
import {counterReducer} from 'entities/Counter'
import {userReducer} from 'entities/User'
import {UIReducer} from 'feature/UI'
import {$api} from 'shared/config/api/api'

import {createReducerManager} from './ReducerManager'
import {StateSchema} from './StateSchema'

export const configureReduxStore = (
    initialState?: StateSchema,
    asyncReducers?:ReducersMapObject<StateSchema>,
) => {
    const rootReducer : ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        // асинхронные редюсеры

        counter: counterReducer,
        user: userReducer,
        ui: UIReducer
    }

    const reducerManager = createReducerManager(rootReducer)

    const store = configureStore({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        reducer: reducerManager.reduce as ReducersMapObject<CombinedState<StateSchema>>,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api
                    }
                }
            })
        }
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof configureReduxStore>['dispatch']

export type StoreSchema = ReturnType<ReturnType<typeof configureReduxStore>['getState']>
export const useAppDispatch = () => useDispatch<AppDispatch>()