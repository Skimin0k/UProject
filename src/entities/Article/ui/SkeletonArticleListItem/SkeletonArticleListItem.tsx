import React, {memo} from 'react'
import {ArticlesListView} from 'entities/Article'
import classNames from 'shared/lib/classNames/classNames'
import {Skeleton} from 'shared/ui/Skeleton/Skeleton'
import Text from 'shared/ui/Text/Text'

import styles from './SkeletonArticleListItem.module.scss'

interface SkeletonArticleListItemProps {
    className?: string,
    view: ArticlesListView
}

export const SkeletonArticleListItem = memo((props: SkeletonArticleListItemProps) => {
    const {
        className,
        view
    } = props

    if(view === ArticlesListView.LIST) {
        return <div
            className={classNames(styles.Skeleton, {}, [className])}
        >
            <div className={styles.SkeletonHeader}>
                <Skeleton height={'50px'} width={'50px'} border={'50%'}/>
                <Skeleton height={'25px'} width={'100px'}/>
            </div>
            <Skeleton height={'25px'} width={'400px'}/>
            <div className={styles.SkeletonTags}>
                <Skeleton height={'25px'} width={'80px'}/>
                <Skeleton height={'25px'} width={'50px'}/>
                <Skeleton height={'25px'} width={'60px'}/>
                <Skeleton height={'25px'} width={'90px'}/>

            </div>
            <Skeleton height={'200px'} width={'100%'}/>
            <Skeleton height={'30px'} width={'120px'}/>
        </div>
    }

    if (view === ArticlesListView.PLATE) {
        return <div className={styles.SkeletonArticlePlateItem}>
            <Skeleton height={'230px'} width={'200px'}/>
            <Skeleton height={'1.2em'} width={'150px'}/>
            <Skeleton height={'1.2em'} width={'190px'}/>
        </div>
    }

    return (
        <div
            className={classNames(styles.SkeletonArticleListItem, {}, [className])}
        >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text={'error'}/>
        </div>
    )
})