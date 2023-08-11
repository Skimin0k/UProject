import {createSelector} from '@reduxjs/toolkit'

import {ProfileSchema} from '../types/ProfileSchema'

import {getProfile} from './getProfile'

export const getProfileProp = (propName: keyof ProfileSchema) => createSelector(getProfile, (state) => state?.[propName])