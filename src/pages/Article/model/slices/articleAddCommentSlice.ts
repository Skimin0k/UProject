import {createSlice} from '@reduxjs/toolkit'

export interface articleAddCommentSliceStateSchema {
    error?:string;
    isLoading: boolean;
    text: string
}

const initialState: articleAddCommentSliceStateSchema = {
    text: '',
    isLoading: false
}

const articleAddCommentSlice = createSlice({
    name: 'articleAddComment',
    initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        }
    }
})

export const {
    name: articleAddCommentName,
    reducer: articleAddCommentReducer,
    actions: articleAddCommentActions
} = articleAddCommentSlice