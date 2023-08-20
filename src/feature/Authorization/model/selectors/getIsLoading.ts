import {createSelector} from '@reduxjs/toolkit'

import {getAuthData} from './getAuthData'

export const getIsLoading = createSelector(getAuthData, (state) => state?.isLoading)