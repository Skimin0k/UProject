import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from 'app/StoreProvider'
import {ArticlesListView} from 'entities/Article'
import {articlesListActions} from 'pages/AritclesListPage/model/slices/ArticlesList'
import classNames from 'shared/lib/classNames/classNames'
import Button, {ButtonThemes} from 'shared/ui/Button/Button'

import styles from './ArticlesListViewSelector.module.scss'

interface ArticlesListViewSelectorProps {
    className?: string
}

export const ArticlesListViewSelector = memo((props: ArticlesListViewSelectorProps) => {
    const {
        className
    } = props

    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const handleClickList = useCallback(() => {
        dispatch(articlesListActions.setArticlesListView(ArticlesListView.LIST))
    }, [dispatch])
    const handleClickPlate = useCallback(() => {
        dispatch(articlesListActions.setArticlesListView(ArticlesListView.PLATE))
    }, [dispatch])

    return (
        <div
            className={classNames(styles.ArticlesListViewSelector, {}, [className])}
        >
            <Button onClick={handleClickList} theme={ButtonThemes.CLEARED} className={styles.ViewSelector}>{t('список_статей_список')}</Button>
            <Button onClick={handleClickPlate} theme={ButtonThemes.CLEARED} className={styles.ViewSelector}>{t('список_статей_плашки')}</Button>
        </div>
    )
})