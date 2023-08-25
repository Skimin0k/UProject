import {StateSchema} from 'app/StoreProvider'
import {articleCommentsReducerName} from 'pages/Article'

export const getArticleCommentsIsLoading = (state: StateSchema) => state?.[articleCommentsReducerName]?.isLoading
export const getArticleCommentsError = (state: StateSchema) => state?.[articleCommentsReducerName]?.error