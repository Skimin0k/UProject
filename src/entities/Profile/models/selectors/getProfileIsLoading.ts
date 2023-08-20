import {createSelector} from '@reduxjs/toolkit'

import {getProfile} from './getProfile'

export const getProfileIsLoading = createSelector(getProfile, (state) => state?.isLoading)