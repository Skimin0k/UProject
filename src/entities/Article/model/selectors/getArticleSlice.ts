import {StateSchema} from 'app/StoreProvider'

import {articleReducerName} from '../Slices/ArticleSlice'

export const getArticleSlice = (state: StateSchema) => state?.[articleReducerName]