import {createSelector} from '@reduxjs/toolkit'

import {getArticleSlice} from './getArticleSlice'

export const getArticleError = createSelector(getArticleSlice, (state) => state?.error)