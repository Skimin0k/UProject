import {createSelector} from '@reduxjs/toolkit'
import {getAuthData} from 'feature/Authorization/model/selectors/getAuthData'

export const getIsLoading = createSelector(getAuthData, (state) => state?.isLoading)