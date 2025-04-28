import {createSelector} from '@reduxjs/toolkit'

import {UserSchema} from '../types/UserSchema'

import {getUser} from './getUser'

export const getUserInit = createSelector(getUser, (state: UserSchema) => state?._init)