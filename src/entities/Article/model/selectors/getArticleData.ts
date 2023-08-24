import {createSelector} from '@reduxjs/toolkit'

import {getArticleSlice} from './getArticleSlice'

export const getArticleData = createSelector(getArticleSlice, (state) => state?.data)