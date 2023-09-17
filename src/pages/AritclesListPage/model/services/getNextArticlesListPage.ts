import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {
    getArticlesFilterOrder,
    getArticlesFilterSearch,
    getArticlesFilterSort
} from 'feature/ArticleFilters/model/ArticleFiltersSlice'

import {
    articlesListReducerName,
    getArticlesListHasMore,
    getArticlesListIsLoading,
    getArticlesListPage
} from '../slices/ArticlesList'

import {fetchArticlesList} from './fetchArticlesList'

export interface getNextArticlesListPageProps {
    replace?:boolean
}
export const getNextArticlesListPage =
    createAsyncThunk<void, getNextArticlesListPageProps, ThunkApi<string>>
    (articlesListReducerName + '/getNextArticlesListPage',async ({replace}, thunkAPI) => {
        const {
            getState,
            dispatch
        } = thunkAPI
        const page = getArticlesListPage(getState()) || 0

        const isLoading = getArticlesListIsLoading(getState())
        const hasMore = getArticlesListHasMore(getState())

        const order = getArticlesFilterOrder(getState())
        const sort = getArticlesFilterSort(getState())
        const search = getArticlesFilterSearch(getState())

        if(!isLoading && hasMore) {
            dispatch(fetchArticlesList({
                _page: page + 1,
                _search: search,
                _sort: sort,
                _order: order,
                replace
            }))
        }
    })