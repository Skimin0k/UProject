import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {
    articlesListReducerName,
    getArticlesListHasMore,
    getArticlesListIsLoading,
    getArticlesListPage
} from '../slices/ArticlesList'

import {fetchArticlesList} from './fetchArticlesList'

export const getNextArticlesListPage =
    createAsyncThunk<void, void, ThunkApi<string>>
    (articlesListReducerName + '/getNextArticlesListPage',async (_, thunkAPI) => {
        const {
            getState,
            dispatch
        } = thunkAPI
        const page = getArticlesListPage(getState()) || 0

        const isLoading = getArticlesListIsLoading(getState())
        const hasMore = getArticlesListHasMore(getState())

        if(!isLoading && hasMore) {
            dispatch(fetchArticlesList({_page: page + 1}))
        }
    })