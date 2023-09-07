import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {ArticleType} from 'entities/Article'

import {
    articlesListReducerName, getArticlesListLimit
} from '../slices/ArticlesList'

export interface fetchArticlesListProps {
    _page: number
}

export const fetchArticlesList =
    createAsyncThunk<ArticleType[], fetchArticlesListProps, ThunkApi<string>>
    (articlesListReducerName + '/fetchArticlesList',async ({_page}, thunkAPI) => {
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
                    _limit
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