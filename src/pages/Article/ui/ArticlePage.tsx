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

export const ArticlePage = () => {
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleIsLoading)
    const error = useSelector(getArticleError)
    const {id} = useParams<{id: string}>()
    const article = useSelector(getArticleData)

    useEffect(() => {
        if(id) dispatch(fetchArticleData(id))
    }, [dispatch, id])

    let content: JSX.Element = <div/>

    if(isLoading){
        // eslint-disable-next-line i18next/no-literal-string
        content = <div> article is loading </div>
    }

    if(error){
        // eslint-disable-next-line i18next/no-literal-string,react/no-unescaped-entities
        content = <div> article failed with error "{error}" </div>
    }

    if (article) {
        content = <div>{JSON.stringify(article)}</div>
    }

    return <LoadableModule reducer={articleReducer} name={articleReducerName}>
        {
            content
        }
    </LoadableModule>
}