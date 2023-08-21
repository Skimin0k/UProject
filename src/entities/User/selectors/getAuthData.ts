import {createSelector} from '@reduxjs/toolkit'

import {UserSchema} from '../types/UserSchema'

import {getUser} from './getUser'

export const getAuthData = createSelector(getUser, (state: UserSchema) => state?.authData)