import {createSelector} from '@reduxjs/toolkit'

import {getAuthData} from './getAuthData'

export const getError = createSelector(getAuthData, (state) => state?.error)