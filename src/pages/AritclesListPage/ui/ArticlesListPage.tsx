import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticleList} from 'entities/Article'
import {ArticlesListView} from 'entities/Article'
import LoadableModule from 'shared/lib/redux/LoadableModule'

import {fetchArticlesList} from '../model/services/fetchArticlesList'
import {
    articlesListReducer,
    articlesListReducerName,
    getArticlesList,
    getArticlesListIsLoading
} from '../model/slices/ArticlesList'

export const ArticlesListPage = () => {
    const dispatch = useAppDispatch()
    const articlesList = useSelector(getArticlesList.selectAll)
    const isLoading = useSelector(getArticlesListIsLoading)

    useEffect(() => {
        dispatch(fetchArticlesList())
    }, [dispatch])

    return <div>
        <LoadableModule name={articlesListReducerName} reducer={articlesListReducer}>
            <ArticleList
                articles={articlesList}
                view={ArticlesListView.LIST}
                isLoading={isLoading || false}
            />
        </LoadableModule>
    </div>
}