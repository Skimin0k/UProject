import { useEffect } from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import {Article} from 'entities/Article'
import {CommentList} from 'entities/Comment'
import {fetchCommentsByArticle} from 'pages/Article/model/services/fetchCommentsByArticle'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import Text from 'shared/ui/Text/Text'

import {getArticleCommentsIsLoading} from '../model/selectors/comments'
import {articleCommentsReducerName, getArticleComments} from '../model/slices/articleCommentsSlice'
import {articleCommentsReducer} from '../model/slices/articleCommentsSlice'

import styles from './ArticlePage.module.scss'

export const ArticlePage = () => {
    const {id} = useParams<{id: string}>()
    const {t} = useTranslation()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (id) dispatch(fetchCommentsByArticle(id))    
    }, [dispatch, id])
 
    if(id === undefined) {
        return <div>
            {t('статья не найдена')}
        </div>
    }

    return <div className={styles.ArticlePage}>
        <LoadableModule name={articleCommentsReducerName} reducer={articleCommentsReducer}>
            <Article id={id}/>
            <Text title={t('Комментарии')} className={styles.CommentTitle}/>
            <CommentList
                comments={comments}
                isLoading={commentsIsLoading || false}
            />
        </LoadableModule>
    </div>
}