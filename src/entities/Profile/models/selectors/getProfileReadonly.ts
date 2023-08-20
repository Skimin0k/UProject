import {createSelector} from '@reduxjs/toolkit'

import {getProfile} from './getProfile'

export const getProfileReadonly = createSelector(getProfile, (state) => state?.readonly)