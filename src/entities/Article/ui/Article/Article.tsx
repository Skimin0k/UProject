import React, { JSX, memo, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticleText} from 'entities/Article/ui/Blocks/ArticleText/ArticleText'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import {Image} from 'shared/ui/Image/Image'
import {Skeleton} from 'shared/ui/Skeleton/Skeleton'
import Text from 'shared/ui/Text/Text'

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
    className?: string,
    id: string
}

const BlockElement = {
    [BlockType.CODE]: (block: Block) => <ArticleCode key={block.id} block={block as CodeBlock}/>,
    [BlockType.TEXT]: (block: Block) => <ArticleText key={block.id} block={block as TextBlock}/>,
    [BlockType.IMAGE]: (block: Block) => <ArticleImage key={block.id} block={block as ImageBlock}/>,
}

const renderBlock = (block: Block) => BlockElement[block.type](block)

export const Article= memo((props: ArticleProps) => {
    const {id} = props
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleIsLoading)
    const error = useSelector(getArticleError)
    const article = useSelector(getArticleData)

    useEffect(() => {
        if(id) dispatch(fetchArticleData(id))
    }, [dispatch, id])

    let content: JSX.Element | undefined

    if(isLoading){
        // eslint-disable-next-line i18next/no-literal-string
        content = <>
            <div className={styles.Article_Icon}>
                <Skeleton height={'100px'} width={'100px'} border={'50%'}/><br/>
            </div>
            <Skeleton height={'50px'} width={'30%'}/><br/>
            <Skeleton height={'150px'} width={'100%'}/><br/>
            <Skeleton height={'160px'} width={'100%'}/><br/>
            <Skeleton height={'100px'} width={'100%'}/><br/>
        </>
    }

    if(error){
        // eslint-disable-next-line i18next/no-literal-string,react/no-unescaped-entities
        content = <div> article failed with error "{error}" </div>
    }

    if (article) {
        content = <>
            <div className={styles.Article_Icon}>
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <Image src={article?.img} alt={article?.img} size={'150px'} style={{background: 'black'}}/>
            </div>
            <div className={styles.Article_Stats}>
                <Text title={article?.subtitle}/>
                <Text text={article?.createdAt}/>
                <Text text={String(article?.views)}/>
            </div>
            {article?.blocks?.map(renderBlock)}
        </>
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
})