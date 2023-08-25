import {createSlice} from '@reduxjs/toolkit'

import {fetchArticleData} from '../services/fetchArticleData'
import {Article} from '../types/article'

export interface ArticleSliceStateSchema {
    data?: Article,
    isLoading: boolean,
    error?: string
}

const initialState: ArticleSliceStateSchema = {
    isLoading: false,
}

const ArticleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(fetchArticleData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchArticleData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(fetchArticleData.fulfilled, (state, action) => {
            state.data = action.payload[0]
            state.isLoading = false
        })
    }
})

export const {
    reducer: articleReducer,
    name: articleReducerName,
    actions: articleActions
} = ArticleSlice
