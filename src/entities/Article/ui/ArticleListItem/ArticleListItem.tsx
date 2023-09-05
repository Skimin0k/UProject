import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'
import {ArticleText} from 'entities/Article/ui/Blocks/ArticleText/ArticleText'
import {routePaths, Routes} from 'shared/config/routeConfig/routerConfig'
import classNames from 'shared/lib/classNames/classNames'
import Button, {ButtonThemes} from 'shared/ui/Button/Button'
import {Image} from 'shared/ui/Image/Image'
import Text from 'shared/ui/Text/Text'

import {Article, ArticlesListView, BlockType, TextBlock} from '../../model/types/article'

import styles from './ArticleListItem.module.scss'

interface ArticleListItemProps {
    className?: string,
    article: Article,
    view: ArticlesListView
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view
    } = props
    const {t} = useTranslation()
    const navigate = useNavigate()
    const handleClick = useCallback(() => {
        navigate(routePaths[Routes.ARTICLE]+article.id)
    }, [article.id, navigate])

    if(view === ArticlesListView.PLATE) {
        return <div className={classNames(styles.Card, {}, [className])}>
            <div className={styles.content}>
                <Image size={'100%'} src={article.img} alt={article.title}/>
                <Text className={styles.Date} text={article.createdAt}/>
            </div>
            <div className={styles.footer}>
                <div className={styles.stat}>
                    <Text
                        className={styles.tags}
                        text={article.type.join(' ')}
                    />
                    <Text text={String(article.views)}/>
                </div>
                <Text className={styles.title} text={article.title}/>
            </div>
        </div>
    } else {
        const textBlocks = article.blocks.find(block => block.type === BlockType.TEXT) as TextBlock
        return( <div className={classNames(styles.Block, {}, [className])}>
            <div className={styles.BlockHeader}>
                <div className={styles.Line}>
                    <div className={styles.User}>
                        <div className={styles.UserIconWrapper}>
                            <Image src={article.user.avatar} size={'100%'}/>
                        </div>
                        <Text text={article.user.username} />
                    </div>
                    <Text text={article.createdAt} />
                </div>
                <Text title={article.title}/>
                <Text title={article.type.join(' ')}/>
            </div>
            <div className={styles.BlockContent}>
                <div className={styles.ImageWrapper}>
                    <Image  src={article.img} alt={article.title} size={'100%'}/>
                </div>
                <div className={styles.Text}>
                    <ArticleText block={textBlocks}/>
                </div>
            </div>
            <div className={styles.BlockBottom}>
                <Button
                    theme={ButtonThemes.OUTLINE}
                    onClick={handleClick}
                >
                    <Text text={t('Читать далее')}/>
                </Button>
                <Text text={String(article.views)}/>
            </div>
        </div>)
    }
})