import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {ArticleType} from 'entities/Article'

import {articlesListReducerName} from '../slices/ArticlesList'

export const fetchArticlesList =
    createAsyncThunk<ArticleType[], void, ThunkApi<string>>
    (articlesListReducerName + '/fetchArticlesList',async (_, thunkAPI) => {
        const {
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI
        try {
            const response = await api.get<ArticleType[]>('/articles', {
                params: {
                    _expand: 'user'
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