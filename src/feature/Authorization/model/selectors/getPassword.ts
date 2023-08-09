import {createSelector} from '@reduxjs/toolkit'
import {getAuthData} from 'feature/Authorization/model/selectors/getAuthData'

export const getPassword = createSelector(getAuthData, (state) => state?.password)