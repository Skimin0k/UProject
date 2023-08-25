import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import {Comment} from 'entities/Comment'
import {fetchCommentsByArticle} from 'pages/Article/model/services/fetchCommentsByArticle'

import {ArticleDetailsCommentsSchema} from '../types/ArticleDetailsCommentsSchema'

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
})

const articleCommentsSlice = createSlice({
    name: 'articleComments',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: false,
        entities: {},
        ids: []
    }),
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchCommentsByArticle.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCommentsByArticle.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(fetchCommentsByArticle.fulfilled, (state, action) => {
            // debugger
            commentsAdapter.setAll(state, action.payload)
            state.isLoading = false
        })
    }
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state[articleCommentsSlice.name] || commentsAdapter.getInitialState()
)

export const {
    name: articleCommentsReducerName,
    reducer: articleCommentsReducer,
    actions: articleCommentsActions
} = articleCommentsSlice