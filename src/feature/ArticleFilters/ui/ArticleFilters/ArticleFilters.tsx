import React, {memo, useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {getNextArticlesListPage} from 'pages/AritclesListPage/model/services/getNextArticlesListPage'
import {articlesListActions} from 'pages/AritclesListPage/model/slices/ArticlesList'
import classNames from 'shared/lib/classNames/classNames'
import {useDebounce} from 'shared/lib/hooks/useDebounce/useDebounce'
import Input from 'shared/ui/Input/Input'
import {OptionType, Select} from 'shared/ui/Select/Select'

import {articleFiltersActions} from '../../model/ArticleFiltersSlice'
import {getArticlesFilterOrder, getArticlesFilterSearch, getArticlesFilterSort} from '../../model/ArticleFiltersSlice'
import {ArticleSortField, SortOrder} from '../../types/FilterTypes'

import styles from './ArticleFilters.module.scss'

interface ArticleFiltersProps {
    className?: string
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const {
        className
    } = props

    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const sortOptions = useMemo<OptionType<SortOrder>[]>(() => ([
        {
            value: SortOrder.ASC,
            content: t('возрастанию')
        },
        {
            value: SortOrder.DESC,
            content: t('убыванию')
        }

    ]),[t])
    const articleSortFieldOptions = useMemo<OptionType<ArticleSortField>[]>(() => ([
        {
            value: ArticleSortField.VIEWS,
            content: t('просмотрам')
        },
        {
            value: ArticleSortField.CREATED,
            content: t('дате создания')
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию')
        }
    ]),[t])

    const searchValue = useSelector(getArticlesFilterSearch)

    const fetchNewArticlesData = useCallback(() => {
        dispatch(getNextArticlesListPage({replace: true}))
    }, [dispatch])
    const fetchNewData = useDebounce(fetchNewArticlesData, 500)

    const onChangeSearchInput = useCallback((value: string) => {
        dispatch(articleFiltersActions.setSearch(value))
        dispatch(articlesListActions.reset())
        fetchNewData()
    }, [dispatch, fetchNewData])

    const sortValue = useSelector(getArticlesFilterSort)
    const onChangeSortInput = useCallback((value: ArticleSortField) => {
        dispatch(articleFiltersActions.setSort(value))
        dispatch(articlesListActions.reset())
        fetchNewArticlesData()
    }, [dispatch, fetchNewArticlesData])

    const orderValue = useSelector(getArticlesFilterOrder)
    const onChangeOrderInput = useCallback((value: SortOrder) => {
        dispatch(articleFiltersActions.setOrder(value))
        dispatch(articlesListActions.reset())
        fetchNewArticlesData()
    }, [dispatch, fetchNewArticlesData])

    return (
        <div
            className={classNames(styles.ArticleFilters, {}, [className])}
        >
            <Input
                onChange={onChangeSearchInput}
                value={searchValue}
                placeholder={t('Поиск')}
                className={styles.SearchInput}
            />
            <Select<SortOrder>
                value={orderValue}
                onChange={onChangeOrderInput}
                options={sortOptions}
                readOnly={false}/>
            <Select<ArticleSortField>
                value={sortValue}
                onChange={onChangeSortInput}
                options={articleSortFieldOptions}
                readOnly={false}/>
        </div>
    )
})