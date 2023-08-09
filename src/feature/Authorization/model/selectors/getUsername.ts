import {createSelector} from '@reduxjs/toolkit'
import {getAuthData} from 'feature/Authorization/model/selectors/getAuthData'

export const getUsername = createSelector(getAuthData, (state) => state?.username)