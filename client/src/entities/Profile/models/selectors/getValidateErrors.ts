import {createSelector} from '@reduxjs/toolkit'

import {getProfile} from './getProfile'

export const getValidateErrors = createSelector(getProfile, (state) => state?.validateError)