import {createSelector} from '@reduxjs/toolkit'

import {Profile} from '../types/ProfileSchema'

import {getProfile} from './getProfile'

export const getProfileProp = <R extends keyof Profile>(propName: R) => createSelector(getProfile, (state) => state?.form?.[propName])