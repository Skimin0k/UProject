import {lazy} from 'react'

export const AuthPageAsync = lazy(() => import('./AuthPage').then(module => ({default:module.AuthPage})))