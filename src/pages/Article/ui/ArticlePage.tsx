import {ChangeEvent, useCallback, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import {Article} from 'entities/Article'
import {AddCommentForm, CommentList} from 'entities/Comment'
import {articleAddCommentName} from 'pages/Article'
import {
    getArticleAddCommentsError,
    getArticleAddCommentsIsLoading,
    getArticleAddCommentText
} from 'pages/Article/model/selectors/addComments'
import {fetchCommentsByArticle} from 'pages/Article/model/services/fetchCommentsByArticle'
import {submitAddComment} from 'pages/Article/model/services/submitAddComment'
import {articleAddCommentActions, articleAddCommentReducer} from 'pages/Article/model/slices/articleAddCommentSlice'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import Text from 'shared/ui/Text/Text'
import {PageWrapper} from 'widgets/Page'

import {getArticleCommentsIsLoading} from '../model/selectors/comments'
import {
    articleCommentsReducerName,
    getArticleComments
} from '../model/slices/articleCommentsSlice'
import {articleCommentsReducer} from '../model/slices/articleCommentsSlice'

import styles from './ArticlePage.module.scss'

export const ArticlePage = () => {
    const {id} = useParams<{id: string}>()
    const {t} = useTranslation()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const dispatch = useAppDispatch()
    
    const addCommentValue = useSelector(getArticleAddCommentText) || ''
    const AddCommentOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(articleAddCommentActions.setText(event.target.value))
    },[dispatch])
    const addCommentError = useSelector(getArticleAddCommentsError)
    const addCommentIsLoading = useSelector(getArticleAddCommentsIsLoading)
    const addCommentOnSubmit = useCallback(() => {
        dispatch(submitAddComment())
        dispatch(articleAddCommentActions.setText(''))
    }, [dispatch])

    useEffect(() => {
        if (id) dispatch(fetchCommentsByArticle(id))    
    }, [dispatch, id])
 
    if(id === undefined) {
        return <div>
            {t('статья не найдена')}
        </div>
    }

    return <LoadableModule name={articleCommentsReducerName} reducer={articleCommentsReducer}>
        <LoadableModule name={articleAddCommentName} reducer={articleAddCommentReducer}>
            <PageWrapper className={styles.ArticlePage}>
                <Article id={id}/>
                <Text title={t('Комментарии')} className={styles.CommentTitle}/>
                <AddCommentForm
                    value={addCommentValue}
                    onChange={AddCommentOnChange}
                    onSubmit={addCommentOnSubmit}
                    error={addCommentError}
                    isLoading = {addCommentIsLoading}
                />
                <CommentList
                    comments={comments}
                    isLoading={commentsIsLoading || false}
                />
            </PageWrapper>
        </LoadableModule>
    </LoadableModule>

}