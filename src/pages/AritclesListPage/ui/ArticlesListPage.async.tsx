import {lazy} from 'react'

export const ArticlesListPageAsync = lazy(() => import('./ArticlesListPage').then(module => ({default:module.ArticlesListPage})))