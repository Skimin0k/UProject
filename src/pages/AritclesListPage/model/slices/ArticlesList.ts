import {createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import {ArticlesListView, ArticleType} from 'entities/Article'
import {__LOCAL_STORAGE_ARTICLES_LIST_VIEW} from 'shared/const/constants'

import {fetchArticlesList} from '../services/fetchArticlesList'

export interface ArticlesListStateSchema extends EntityState<ArticleType> {
    isLoading: boolean,
    error?: string,
    view: ArticlesListView,
    page: number,
    hasMore: boolean,
    limit: number
}
const ArticlesListAdapter = createEntityAdapter<ArticleType>({
    selectId: article => article.id
})

const initialView = (localStorage.getItem(__LOCAL_STORAGE_ARTICLES_LIST_VIEW) as ArticlesListView) ||  ArticlesListView.PLATE
const limitConfig: Record<ArticlesListView, number> = {
    [ArticlesListView.PLATE]: 5,
    [ArticlesListView.LIST]: 3,
}

const initialState: ArticlesListStateSchema = {
    ...ArticlesListAdapter.getInitialState(),
    error: '',
    isLoading: false,
    view: initialView,
    page: 0,
    hasMore: true,
    limit: limitConfig[initialView]
}

const ArticlesList = createSlice({
    name: 'articlesList',
    initialState,
    reducers: {
        setArticlesListView: (state, action: PayloadAction<ArticlesListView>) => {
            state.view = action.payload
            localStorage.setItem(__LOCAL_STORAGE_ARTICLES_LIST_VIEW, action.payload)
        },
        reset: (state) => {
            state.page = 0
            state.hasMore= true
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchArticlesList.pending, (state, action) => {
            state.isLoading = true
            if(action.meta.arg.replace) {
                ArticlesListAdapter.removeAll(state)
            }
        })
        builder.addCase(fetchArticlesList.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
            if(action.meta.arg.replace) {
                ArticlesListAdapter.setAll(state, action.payload)
            } else {
                ArticlesListAdapter.addMany(state, action.payload)
            }
            if(action.payload.length > 0) {
                state.page++
            }
            state.hasMore = action.payload.length > 0
            state.isLoading = false
        })
    }
})
export const getArticlesList = ArticlesListAdapter.getSelectors((state: StateSchema) => state?.[articlesListReducerName] || ArticlesListAdapter.getInitialState())
export const getArticlesListIsLoading = (state: StateSchema) => state?.[articlesListReducerName]?.isLoading
export const getArticlesListView = (state: StateSchema) => state?.[articlesListReducerName]?.view
export const getArticlesListPage = (state: StateSchema) => state?.[articlesListReducerName]?.page
export const getArticlesListHasMore = (state: StateSchema) => state?.[articlesListReducerName]?.hasMore
export const getArticlesListLimit = (state: StateSchema) => state?.[articlesListReducerName]?.limit
export const {
    name: articlesListReducerName,
    reducer: articlesListReducer,
    actions: articlesListActions
} = ArticlesList