import {createEntityAdapter, createSlice, EntityState} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import {ArticleType} from 'entities/Article'

import {fetchArticlesList} from '../services/fetchArticlesList'

export interface ArticlesListStateSchema extends EntityState<ArticleType> {
    isLoading: boolean,
    error?: string,
}

const initialState: ArticlesListStateSchema = {
    entities: {},
    error: '',
    ids: [],
    isLoading: false,
}

const ArticlesListAdapter = createEntityAdapter<ArticleType>({
    selectId: article => article.id
})

const ArticlesList = createSlice({
    name: 'articlesList',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchArticlesList.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchArticlesList.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
            ArticlesListAdapter.setAll(state, action.payload)
            state.isLoading = false
        })
    }
})
export const getArticlesList = ArticlesListAdapter.getSelectors((state: StateSchema) => state?.[articlesListReducerName] || ArticlesListAdapter.getInitialState())
export const getArticlesListIsLoading = (state: StateSchema) => state?.[articlesListReducerName]?.isLoading
export const {
    name: articlesListReducerName,
    reducer: articlesListReducer,
    actions: articlesListActions
} = ArticlesList