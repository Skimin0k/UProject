import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import {CodeBlock} from '../../../model/types/article'

import styles from './ArticleCode.module.scss'

interface ArticleCodeProps {
    className?: string,
    block: CodeBlock
}

export const ArticleCode: FC<ArticleCodeProps> = (props) => {
    const {
        className,
        children
    } = props
    return (
        <div
            className={classNames(styles.ArticleCode, {}, [className])}
        >
            {children}
        </div>
    )
}