import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import {TextBlock} from '../../../model/types/article'

import styles from './ArticleText.module.scss'

interface ArticleTextProps {
    className?: string,
    block: TextBlock
}

export const ArticleText: FC<ArticleTextProps> = (props) => {
    const {
        className,
        children
    } = props
    return (
        <div
            className={classNames(styles.ArticleText, {}, [className])}
        >
            {children}
        </div>
    )
}