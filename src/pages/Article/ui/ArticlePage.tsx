import {JSX, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import {
    articleReducer,
    articleReducerName,
    fetchArticleData, getArticleData,
    getArticleError,
    getArticleIsLoading
} from 'entities/Article'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import {Skeleton} from 'shared/ui/Skeleton/Skeleton'

import styles from './ArticlePage.module.scss'

export const ArticlePage = () => {
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleIsLoading)
    const error = useSelector(getArticleError)
    const {id} = useParams<{id: string}>()
    const article = useSelector(getArticleData)

    useEffect(() => {
        if(id) dispatch(fetchArticleData(id))
    }, [dispatch, id])

    let content: JSX.Element | undefined

    if(isLoading){
        // eslint-disable-next-line i18next/no-literal-string
        content = <>
            <Skeleton height={'100px'} width={'100px'} border={'50%'}/>
            <Skeleton height={'50px'} width={'30%'}/>
            <Skeleton height={'150px'} width={'100%'}/>
            <Skeleton height={'160px'} width={'100%'}/>
            <Skeleton height={'100px'} width={'100%'}/>
        </>
    }

    if(error){
        // eslint-disable-next-line i18next/no-literal-string,react/no-unescaped-entities
        content = <div> article failed with error "{error}" </div>
    }

    if (article) {
        content = <div>{JSON.stringify(article)}</div>
    }

    return <LoadableModule reducer={articleReducer} name={articleReducerName}>
        <div className={styles.ArticlePage}>
            {
                content
            }
        </div>
    </LoadableModule>
}