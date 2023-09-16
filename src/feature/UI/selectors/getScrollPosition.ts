import {createSelector} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'

export const getScrollState = (state: StateSchema) => state.ui.scroll
export const getScrollPosition = (pathname: string) => createSelector(getScrollState, (state) => state[pathname])