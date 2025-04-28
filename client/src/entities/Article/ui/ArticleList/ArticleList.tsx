import React, { memo, useCallback} from 'react'
import {ArticlesListView, ArticleType} from 'entities/Article'
import classNames from 'shared/lib/classNames/classNames'

import {ArticleListItem} from '../ArticleListItem/ArticleListItem'
import {SkeletonArticleListItem} from '../SkeletonArticleListItem/SkeletonArticleListItem'

import styles from './ArticleList.module.scss'

interface ArticleListProps {
    className?: string,
    articles: ArticleType[],
    view?: ArticlesListView
    isLoading: boolean,
    error?: string,
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticlesListView.PLATE,
        isLoading,
        error
    } = props

    const renderArticleItem = useCallback((article: ArticleType) => {
        return <ArticleListItem
            key={article.id}
            article={article}
            view={view}
        />
    }, [view])

    const renderSkeletonArticleListItem = useCallback(() => {
        return Array.from({length:5},(_, idx) => <SkeletonArticleListItem key={idx} view={view}/>)
    },[view])

    return (
        <div
            className={classNames(styles.ArticleList, {}, [className])}
        >
            {articles.map(renderArticleItem)}
            {isLoading && renderSkeletonArticleListItem()}
        </div>
    )
})