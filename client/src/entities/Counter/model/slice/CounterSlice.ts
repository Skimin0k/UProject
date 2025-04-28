import {createSlice} from '@reduxjs/toolkit'

import {CounterSchema} from '../types/CounterSchema'

const initialState: CounterSchema = {
    value: 0
}

const CounterSlice = createSlice({
    initialState,
    name: 'counter',
    reducers: {
        increment: state => {
            state.value++
        },
        decrement: state => {
            state.value--
        }
    }
})
export const {
    reducer: counterReducer,
    actions: counterActions
} =  CounterSlice
