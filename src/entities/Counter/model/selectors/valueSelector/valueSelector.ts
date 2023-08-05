import {createSelector} from '@reduxjs/toolkit'
import {counterSelector} from 'entities/Counter/model/selectors/counterSelector/counterSelector'
import {CounterSchema} from 'entities/Counter/model/types/CounterSchema'

export const valueSelector = createSelector([counterSelector], (state: CounterSchema) => state.value)
