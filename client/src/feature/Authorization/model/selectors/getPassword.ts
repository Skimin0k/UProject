import {createSelector} from '@reduxjs/toolkit'

import {getAuthData} from './getAuthData'

export const getPassword = createSelector(getAuthData, (state) => state?.password)