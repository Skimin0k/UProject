import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticleList} from 'entities/Article'
import {ArticlesListViewSelector} from 'feature/ArticlesListViewSelector/ArticlesListViewSelector'
import LoadableModule from 'shared/lib/redux/LoadableModule'

import {fetchArticlesList} from '../model/services/fetchArticlesList'
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

    useEffect(() => {
        dispatch(fetchArticlesList())
    }, [dispatch])

    return <div>
        <LoadableModule name={articlesListReducerName} reducer={articlesListReducer}>
            <ArticlesListViewSelector/>
            <ArticleList
                articles={articlesList}
                view={listView}
                isLoading={isLoading || false}
            />
        </LoadableModule>
    </div>
}