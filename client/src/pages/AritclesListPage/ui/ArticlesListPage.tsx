import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticleList} from 'entities/Article'
import {ArticleFilters, articleFiltersName, articleFiltersReducer} from 'feature/ArticleFilters'
import {ArticlesListViewSelector} from 'feature/ArticlesListViewSelector/ArticlesListViewSelector'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import {PageWrapper} from 'widgets/Page'

import {getNextArticlesListPage} from '../model/services/getNextArticlesListPage'
import {
    articlesListReducer,
    articlesListReducerName,
    getArticlesList, getArticlesListHasMore,
    getArticlesListIsLoading, getArticlesListView
} from '../model/slices/ArticlesList'

const asyncReducers = {
    [articlesListReducerName]:articlesListReducer,
    [articleFiltersName]:articleFiltersReducer
}
export const ArticlesListPage = () => {
    const dispatch = useAppDispatch()
    const articlesList = useSelector(getArticlesList.selectAll)
    const isLoading = useSelector(getArticlesListIsLoading)
    const listView = useSelector(getArticlesListView)
    const hasMore = useSelector(getArticlesListHasMore)

    const onScrollEnd = useCallback(() => {
        if(!isLoading && hasMore) {
            dispatch(getNextArticlesListPage())
        }
    }, [dispatch, hasMore, isLoading])

    return <LoadableModule
        reducers={asyncReducers}
        saveAfterUnmount
    >
        <PageWrapper
            onScrollEnd={onScrollEnd}
        >
            <ArticleFilters/>
            <ArticlesListViewSelector/>
            <ArticleList
                articles={articlesList}
                view={listView}
                isLoading={isLoading || false}
            />
        </PageWrapper>
    </LoadableModule>
}