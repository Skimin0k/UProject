import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'

import {ArticleSortField, SortOrder} from '../types/FilterTypes'

export interface ArticleFiltersSliceStateSchema {
    order: SortOrder,
    sort: ArticleSortField,
    search: string
}

const initialState: ArticleFiltersSliceStateSchema = {
    order: SortOrder.ASC,
    sort: ArticleSortField.VIEWS,
    search: ''
}

const ArticleFiltersSlice = createSlice({
    name: 'articleFilters',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        }
    }
})

export const {
    name: articleFiltersName,
    reducer: articleFiltersReducer,
    actions: articleFiltersActions
} = ArticleFiltersSlice

export const getArticlesFilterOrder = (state: StateSchema) => state[articleFiltersName]?.order ?? initialState.order
export const getArticlesFilterSort = (state: StateSchema) => state[articleFiltersName]?.sort ?? initialState.sort
export const getArticlesFilterSearch = (state: StateSchema) => state[articleFiltersName]?.search ?? initialState.search