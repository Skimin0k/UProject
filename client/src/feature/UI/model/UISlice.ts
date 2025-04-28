import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ScrollSchema} from '../types/UISchemas'

export interface UISliceStateSchema {
    scroll: Record<string, number>
}

const initialState: UISliceStateSchema = {
    scroll: {}
}

const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        saveScroll: (state, action: PayloadAction<ScrollSchema>) => {
            state.scroll[action.payload.path] = action.payload.position
        }
    }
})

export const {
    reducer: UIReducer,
    actions: UIActions
} = UISlice