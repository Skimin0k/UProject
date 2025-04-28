import React, { memo, useMemo} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import Text from 'shared/ui/Text/Text'

import {TextBlock} from '../../../model/types/article'

import styles from './ArticleText.module.scss'

interface ArticleTextProps {
    className?: string,
    block: TextBlock
}

export const ArticleText = memo((props: ArticleTextProps) => {
    const {
        className,
        block
    } = props
    const renderParagraph = useMemo(() => block.paragraphs.map(paragraph => <Text key={paragraph} text={paragraph}/>), [block.paragraphs])
    return (
        <div
            className={classNames(styles.ArticleText, {}, [className])}
        >
            <Text title={block.title}/>
            {
                renderParagraph
            }
        </div>
    )
})