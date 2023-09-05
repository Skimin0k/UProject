import {createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import {ArticlesListView, ArticleType} from 'entities/Article'
import {__LOCAL_STORAGE_ARTICLES_LIST_VIEW} from 'shared/const/constants'

import {fetchArticlesList} from '../services/fetchArticlesList'

export interface ArticlesListStateSchema extends EntityState<ArticleType> {
    isLoading: boolean,
    error?: string,
    view: ArticlesListView
}

const initialState: ArticlesListStateSchema = {
    entities: {},
    error: '',
    ids: [],
    isLoading: false,
    view: (window.localStorage.getItem(__LOCAL_STORAGE_ARTICLES_LIST_VIEW) as ArticlesListView) ||  ArticlesListView.PLATE
}

const ArticlesListAdapter = createEntityAdapter<ArticleType>({
    selectId: article => article.id
})

const ArticlesList = createSlice({
    name: 'articlesList',
    initialState,
    reducers: {
        setArticlesListView: (state, action: PayloadAction<ArticlesListView>) => {
            state.view = action.payload
            window.localStorage.setItem(__LOCAL_STORAGE_ARTICLES_LIST_VIEW, action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchArticlesList.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchArticlesList.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<ArticleType[]>) => {
            ArticlesListAdapter.setAll(state, action.payload)
            state.isLoading = false
        })
    }
})
export const getArticlesList = ArticlesListAdapter.getSelectors((state: StateSchema) => state?.[articlesListReducerName] || ArticlesListAdapter.getInitialState())
export const getArticlesListIsLoading = (state: StateSchema) => state?.[articlesListReducerName]?.isLoading
export const getArticlesListView = (state: StateSchema) => state?.[articlesListReducerName]?.view
export const {
    name: articlesListReducerName,
    reducer: articlesListReducer,
    actions: articlesListActions
} = ArticlesList