import {StateSchema} from 'app/StoreProvider'
import {articleAddCommentName} from 'pages/Article'

export const getArticleAddCommentsIsLoading = (state: StateSchema) => state?.[articleAddCommentName]?.isLoading
export const getArticleAddCommentsError = (state: StateSchema) => state?.[articleAddCommentName]?.error

export const getArticleAddCommentText = (state: StateSchema) => state?.[articleAddCommentName]?.text