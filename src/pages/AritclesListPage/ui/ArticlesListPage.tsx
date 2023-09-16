import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticleList} from 'entities/Article'
import {ArticlesListViewSelector} from 'feature/ArticlesListViewSelector/ArticlesListViewSelector'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import {PageWrapper} from 'widgets/Page'

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

    const onScrollEnd = useCallback(() => {
        dispatch(getNextArticlesListPage())
    }, [dispatch])
    return <LoadableModule name={articlesListReducerName} reducer={articlesListReducer} saveAfterUnmount>
        <PageWrapper
            onScrollEnd={onScrollEnd}
        >

            <ArticlesListViewSelector/>
            <ArticleList
                articles={articlesList}
                view={listView}
                isLoading={isLoading || false}
            />
        </PageWrapper>
    </LoadableModule>
}