import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { articleReducerName, ArticleSliceStateSchema} from 'entities/Article'
import {CounterSchema} from 'entities/Counter'
import {ProfileSchema} from 'entities/Profile'
import {UserSchema} from 'entities/User'
import {articleFiltersName, ArticleFiltersSliceStateSchema} from 'feature/ArticleFilters/model/ArticleFiltersSlice'
import {AuthSchema} from 'feature/Authorization'
import {UISliceStateSchema} from 'feature/UI'
import {articlesListReducerName, ArticlesListStateSchema} from 'pages/AritclesListPage/model/slices/ArticlesList'
import {
    articleAddCommentName,
    articleAddCommentSliceStateSchema,
    articleCommentsReducerName,
    ArticleDetailsCommentsSchema
} from 'pages/Article'

export interface StateSchema {
    counter: CounterSchema,
    user: UserSchema,
    ui: UISliceStateSchema

    //асинхронные редюсеры
    auth?: AuthSchema,
    profile?: ProfileSchema,
    [articleReducerName]?: ArticleSliceStateSchema,
    [articleCommentsReducerName]?: ArticleDetailsCommentsSchema,
    [articleAddCommentName]?: articleAddCommentSliceStateSchema,
    [articlesListReducerName]?: ArticlesListStateSchema
    [articleFiltersName]?: ArticleFiltersSliceStateSchema
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
}
export interface ThunkApi<T> {
    rejectValue: T,
    extra: ThunkExtraArgs,
    state: StateSchema
}