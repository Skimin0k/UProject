import {NavigateFunction} from 'react-router/dist/lib/hooks'
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { articleReducerName, ArticleSliceStateSchema} from 'entities/Article'
import {CounterSchema} from 'entities/Counter'
import {ProfileSchema} from 'entities/Profile'
import {UserSchema} from 'entities/User'
import {AuthSchema} from 'feature/Authorization'
import {
    articleAddCommentName,
    articleAddCommentSliceStateSchema,
    articleCommentsReducerName,
    ArticleDetailsCommentsSchema
} from 'pages/Article'

export interface StateSchema {
    counter: CounterSchema,
    user: UserSchema,

    //асинхронные редюсеры
    auth?: AuthSchema,
    profile?: ProfileSchema,
    [articleReducerName]?: ArticleSliceStateSchema,
    [articleCommentsReducerName]?: ArticleDetailsCommentsSchema,
    [articleAddCommentName]?: articleAddCommentSliceStateSchema
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

export interface ThunkExtraArgs {
    api: AxiosInstance,
    navigate?: NavigateFunction
}
export interface ThunkApi<T> {
    rejectValue: T,
    extra: ThunkExtraArgs,
    state: StateSchema
}