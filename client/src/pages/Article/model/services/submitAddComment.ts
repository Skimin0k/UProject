import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {getArticleData} from 'entities/Article'
import {Comment} from 'entities/Comment'
import {getAuthData} from 'entities/User'
import {fetchCommentsByArticle} from 'pages/Article/model/services/fetchCommentsByArticle'

import {getArticleAddCommentText} from '../selectors/addComments'

export const submitAddComment =
    createAsyncThunk<Comment, void, ThunkApi<string>>
    ('articleAddComment/submitAddComment',async (_, thunkAPI) => {
        const {
            rejectWithValue,
            getState,
            dispatch,
            extra: {
                api
            }
        } = thunkAPI
        const text = getArticleAddCommentText(getState())
        const user = getAuthData(getState())
        const article = getArticleData(getState())

        try {

            if (!user || !text  || !article) {
                throw new Error()
            }

            const response = await api.post<Comment>('comments', {
                articleId: article.id,
                userId: user.id,
                text
            }, {
                params: {
                    _expand: 'user'
                }
            })
            if (!response.data) {
                throw new Error
            }

            dispatch(fetchCommentsByArticle(article.id))
            return response.data
        } catch (e) {
            return rejectWithValue('fetch comments by article failed')
        }
    })