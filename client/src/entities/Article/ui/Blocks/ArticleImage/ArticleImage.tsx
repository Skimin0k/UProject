import React, {memo} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import {Image} from 'shared/ui/Image/Image'
import Text, {TextAlign} from 'shared/ui/Text/Text'

import {ImageBlock} from '../../../model/types/article'

import styles from './ArticleImage.module.scss'

interface ArticleImageProps {
    className?: string,
    block: ImageBlock
}

export const ArticleImage = memo((props: ArticleImageProps) => {
    const {
        className,
        block
    } = props

    return (
        <div
            className={classNames(styles.ArticleImage, {}, [className])}
        >
            <Image src={block.src} alt={block.title} size={''}/>
            <Text text={block.title} align={TextAlign.CENTER}/>
        </div>
    )
})