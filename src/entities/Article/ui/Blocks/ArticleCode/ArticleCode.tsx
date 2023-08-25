import React, { memo} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import {CodeBlock} from '../../../model/types/article'

import styles from './ArticleCode.module.scss'

interface ArticleCodeProps {
    className?: string,
    block: CodeBlock
}

export const ArticleCode = memo((props:ArticleCodeProps) => {
    const {
        className,
        block
    } = props
    return (
        <div
            className={classNames(styles.ArticleCode, {}, [className])}
        >
            <pre>
                {block.code}
            </pre>
        </div>
    )
})