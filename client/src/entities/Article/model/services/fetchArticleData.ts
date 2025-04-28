import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {__UserData__} from 'shared/const/constants'

import {Article} from '../types/article'

export const fetchArticleData = createAsyncThunk<Article, Article['id'], ThunkApi<string>>(
    'article/fetch_data',
    async (id, thunkApi) => {
        const {
            rejectWithValue,
            extra: {
                api
            }
        } = thunkApi
        try {
            const response = await api.get<Article>('articles/'+id, {
                headers: {
                    authorization: localStorage.getItem(__UserData__)
                },
                params: {
                    _expand: 'user'
                }
            })

            return response.data
        } catch (e) {
            return rejectWithValue('failed to fetch article data')
        }
    })