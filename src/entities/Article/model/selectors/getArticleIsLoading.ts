import {createSelector} from '@reduxjs/toolkit'

import {getArticleSlice} from './getArticleSlice'

export const getArticleIsLoading = createSelector(getArticleSlice, (state) => state?.isLoading)