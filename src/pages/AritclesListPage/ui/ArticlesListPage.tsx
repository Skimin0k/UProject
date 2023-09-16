import React, {UIEvent,useCallback, useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticleList} from 'entities/Article'
import {ArticlesListViewSelector} from 'feature/ArticlesListViewSelector/ArticlesListViewSelector'
import {UIActions} from 'feature/UI'
import {getScrollPosition} from 'feature/UI/selectors/getScrollPosition'
import {useIntersectionObserver} from 'shared/lib/hooks/useIntersectionObserver/useIntersectionObserver'
import {useThrottle} from 'shared/lib/hooks/useThrottle/useThrottle'
import LoadableModule from 'shared/lib/redux/LoadableModule'

import {getNextArticlesListPage} from '../model/services/getNextArticlesListPage'
import {
    articlesListReducer,
    articlesListReducerName,
    getArticlesList,
    getArticlesListIsLoading, getArticlesListView
} from '../model/slices/ArticlesList'

import styles from './ArticlesListPage.module.scss'

export const ArticlesListPage = () => {
    const dispatch = useAppDispatch()
    const articlesList = useSelector(getArticlesList.selectAll)
    const isLoading = useSelector(getArticlesListIsLoading)
    const listView = useSelector(getArticlesListView)
    const targetElement = useRef() as React.MutableRefObject<HTMLDivElement>
    const rootElement = useRef() as React.MutableRefObject<HTMLDivElement>
    const {pathname} = useLocation()
    const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>

    const onIntersecting = useCallback(() => {
        dispatch(getNextArticlesListPage())
    }, [dispatch])

    useIntersectionObserver({
        callback: onIntersecting,
        targetElement,
        rootElement
    })
    const onScrollHandler = useThrottle((event: UIEvent<HTMLDivElement>) => {
        dispatch(UIActions.saveScroll({path: pathname, position: event.currentTarget.scrollTop}))
    }, 500)
    // const onScrollHandler = useDebounce(
    //     (event: UIEvent<HTMLDivElement>) => {
    //         dispatch(UIActions.saveScroll({path: pathname, position: (event.target as HTMLElement).scrollTop}))
    //     }, 500)

    const scrollPosition = useSelector(getScrollPosition(pathname))
    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    }, [scrollPosition])

    return <div
        onScroll={onScrollHandler}
        className={styles.ArticlesListPage}
        ref={wrapperRef}
    >
        <LoadableModule name={articlesListReducerName} reducer={articlesListReducer} saveAfterUnmount>
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