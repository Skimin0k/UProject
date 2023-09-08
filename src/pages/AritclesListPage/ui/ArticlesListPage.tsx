import React, {useCallback, useRef} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticleList} from 'entities/Article'
import {ArticlesListViewSelector} from 'feature/ArticlesListViewSelector/ArticlesListViewSelector'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import {useIntersectionObserver} from 'shared/lib/useIntersectionObserver/useIntersectionObserver'

import {getNextArticlesListPage} from '../model/services/getNextArticlesListPage'
import {
    articlesListReducer,
    articlesListReducerName,
    getArticlesList,
    getArticlesListIsLoading, getArticlesListView
} from '../model/slices/ArticlesList'

export const ArticlesListPage = () => {
    const dispatch = useAppDispatch()
    const articlesList = useSelector(getArticlesList.selectAll)
    const isLoading = useSelector(getArticlesListIsLoading)
    const listView = useSelector(getArticlesListView)
    const targetElement = useRef() as React.MutableRefObject<HTMLDivElement>
    const rootElement = useRef() as React.MutableRefObject<HTMLDivElement>

    const onIntersecting = useCallback(() => {
        dispatch(getNextArticlesListPage())
    }, [dispatch])

    useIntersectionObserver({
        callback: onIntersecting,
        targetElement,
        rootElement
    })

    return <div>
        <LoadableModule name={articlesListReducerName} reducer={articlesListReducer}>
            <ArticlesListViewSelector/>
            <ArticleList
                articles={articlesList}
                view={listView}
                isLoading={isLoading || false}
            />
            <div ref={targetElement}/>
        </LoadableModule>
    </div>
}