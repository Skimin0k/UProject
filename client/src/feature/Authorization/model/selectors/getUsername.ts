import {createSelector} from '@reduxjs/toolkit'

import {getAuthData} from './getAuthData'

export const getUsername = createSelector(getAuthData, (state) => state?.username)