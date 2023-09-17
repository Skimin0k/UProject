import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {ArticleType} from 'entities/Article'
import {ArticleSortField, SortOrder} from 'feature/ArticleFilters'

import {
    articlesListReducerName, getArticlesListLimit
} from '../slices/ArticlesList'

export interface fetchArticlesListProps {
    _page: number,
    _sort: ArticleSortField,
    _order: SortOrder,
    _search: string,
    replace?: boolean
}

export const fetchArticlesList =
    createAsyncThunk<ArticleType[], fetchArticlesListProps, ThunkApi<string>>
    (articlesListReducerName + '/fetchArticlesList',async (props, thunkAPI) => {
        const {
            _page,
            _sort,
            _order,
            _search
        } = props

        const {
            getState,
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI

        const _limit = getArticlesListLimit(getState())
        try {
            const response = await api.get<ArticleType[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page,
                    _limit,
                    _sort,
                    _order,
                    q: _search
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