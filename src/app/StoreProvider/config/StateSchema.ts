import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import {CounterSchema} from 'entities/Counter/model/types/CounterSchema'
import {UserSchema} from 'entities/user'
import {AuthSchema} from 'feature/Authorization'

export interface StateSchema {
    counter: CounterSchema,
    user: UserSchema,

    //асинхронные редюсеры
    auth?: AuthSchema,
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void,
}
export type StateSchemaKey = keyof StateSchema

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema>{
    reducerManager: ReducerManager
}