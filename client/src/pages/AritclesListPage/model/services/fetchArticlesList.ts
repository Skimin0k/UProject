import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {ArticleType} from 'entities/Article'
import {
    getArticlesFilterOrder,
    getArticlesFilterSearch,
    getArticlesFilterSort
} from 'feature/ArticleFilters/model/ArticleFiltersSlice'
import {addQuerryParams, getQuerryParams} from 'shared/lib/url/addQuerryParams'

import {
    articlesListReducerName, getArticlesListLimit
} from '../slices/ArticlesList'

export interface fetchArticlesListProps {
    _page?: number,
    replace?: boolean
}

export const fetchArticlesList =
    createAsyncThunk<ArticleType[], fetchArticlesListProps, ThunkApi<string>>
    (articlesListReducerName + '/fetchArticlesList',async (props, thunkAPI) => {
        const {
            _page = 1,
        } = props

        const {
            getState,
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI

        const order = getArticlesFilterOrder(getState())
        const sort = getArticlesFilterSort(getState())
        const search = getArticlesFilterSearch(getState())

        const _limit = getArticlesListLimit(getState())
        try {
            addQuerryParams(getQuerryParams({search, sort, order}))
            const response = await api.get<ArticleType[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page,
                    _limit,
                    _sort: sort,
                    _order: order,
                    q: search
                }
            })
            if(response?.data === undefined) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue('fetch articles list failed')
        }
    })