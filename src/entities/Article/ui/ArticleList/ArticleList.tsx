import React, {memo, useCallback, useRef} from 'react'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticlesListView, ArticleType} from 'entities/Article'
import {getNextArticlesListPage} from 'pages/AritclesListPage/model/services/getNextArticlesListPage'
import classNames from 'shared/lib/classNames/classNames'
import {useIntersectionObserver} from 'shared/lib/useIntersectionObserver/useIntersectionObserver'
import {Skeleton} from 'shared/ui/Skeleton/Skeleton'

import {ArticleListItem} from '../ArticleListItem/ArticleListItem'

import styles from './ArticleList.module.scss'

interface ArticleListProps {
    className?: string,
    articles: ArticleType[],
    view?: ArticlesListView
    isLoading: boolean,
    error?: string
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticlesListView.PLATE,
        isLoading,
        error
    } = props
    const targetElement = useRef() as React.MutableRefObject<HTMLDivElement>
    const rootElement = useRef() as React.MutableRefObject<HTMLDivElement>
    const dispatch = useAppDispatch()

    const onIntersecting = useCallback(() => {
        dispatch(getNextArticlesListPage())
    }, [dispatch])

    useIntersectionObserver({
        callback: onIntersecting,
        targetElement,
        rootElement
    })

    const renderArticleItem = useCallback((article: ArticleType) => {
        return <ArticleListItem
            key={article.id}
            article={article}
            view={view}
        />
    }, [view])

    return (
        <div
            className={classNames(styles.ArticleList, {}, [className])}
        >
            {articles.map(renderArticleItem)}
            {isLoading && (<div
                className={classNames(styles.Skeleton, {}, [className])}
            >
                <div className={styles.SkeletonHeader}>
                    <Skeleton height={'50px'} width={'50px'} border={'50%'}/>
                    <Skeleton height={'25px'} width={'100px'}/>
                </div>
                <Skeleton height={'25px'} width={'400px'}/>
                <div className={styles.SkeletonTags}>
                    <Skeleton height={'25px'} width={'80px'}/>
                    <Skeleton height={'25px'} width={'50px'}/>
                    <Skeleton height={'25px'} width={'60px'}/>
                    <Skeleton height={'25px'} width={'90px'}/>

                </div>
                <Skeleton height={'200px'} width={'100%'}/>
                <Skeleton height={'30px'} width={'120px'}/>
            </div>)}
            <div ref={targetElement}/>
        </div>
    )
})