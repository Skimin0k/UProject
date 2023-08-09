import {createSelector} from '@reduxjs/toolkit'
import {getAuthData} from 'feature/Authorization/model/selectors/getAuthData'

export const getError = createSelector(getAuthData, (state) => state?.error)