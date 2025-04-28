import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {Comment} from 'entities/Comment'

export const fetchCommentsByArticle = 
    createAsyncThunk<Comment[], string, ThunkApi<string>>
    ('articleComments/fetchCommentsByArticle',async (articleId, thunkAPI) => {
        const {
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI
        try {
            const response = await api.get<Comment[]>('comments', {
                params: {
                    articleId,
                    _expand: 'user'
                }
            })
            if(response?.data === undefined) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue('fetch comments by article failed')
        }
    })