import React, {FC, JSX, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticleText} from 'entities/Article/ui/Blocks/ArticleText/ArticleText'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import {Skeleton} from 'shared/ui/Skeleton/Skeleton'

import {getArticleData} from '../../model/selectors/getArticleData'
import {getArticleError} from '../../model/selectors/getArticleError'
import {getArticleIsLoading} from '../../model/selectors/getArticleIsLoading'
import {fetchArticleData} from '../../model/services/fetchArticleData'
import {articleReducer, articleReducerName} from '../../model/Slices/ArticleSlice'
import {Block,BlockType, CodeBlock, ImageBlock, TextBlock} from '../../model/types/article'
import {ArticleCode} from '../Blocks/ArticleCode/ArticleCode'
import {ArticleImage} from '../Blocks/ArticleImage/ArticleImage'

import styles from './Article.module.scss'

interface ArticleProps {
    className?: string
}

const Block = {
    [BlockType.CODE]: (block: Block) => <ArticleCode key={block.id} block={block as CodeBlock}/>,
    [BlockType.TEXT]: (block: Block) => <ArticleText key={block.id} block={block as TextBlock}/>,
    [BlockType.IMAGE]: (block: Block) => <ArticleImage key={block.id} block={block as ImageBlock}/>,
}

const renderBlock = (block: Block) => Block[block.type](block)

export const Article: FC<ArticleProps> = (props) => {
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
        content = <>{article?.blocks?.map(renderBlock)}</>
    }
    return (
        <LoadableModule reducer={articleReducer} name={articleReducerName}>
            <div className={styles.Article}>
                {
                    content
                }
            </div>
        </LoadableModule>
    )
}