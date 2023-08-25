import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import {ImageBlock} from '../../../model/types/article'

import styles from './ArticleImage.module.scss'

interface ArticleImageProps {
    className?: string,
    block: ImageBlock
}

export const ArticleImage: FC<ArticleImageProps> = (props) => {
    const {
        className,
        children
    } = props
    return (
        <div
            className={classNames(styles.ArticleImage, {}, [className])}
        >
            {children}
        </div>
    )
}