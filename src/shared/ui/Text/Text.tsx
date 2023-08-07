import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Text.module.scss'

interface TextProps {
    className?: string,
    title?: string,
    text?: string,
    theme?: ThemeText
}

export enum ThemeText {
    Primary = 'primary',
    Error = 'error'
}
const Text: FC<TextProps> = (props) => {
    const {
        className,
        title,
        text,
        theme = ThemeText.Primary
    } = props
    return (
        <div
            className={classNames(styles.Text, {[styles[theme]]: true}, [className])}
        >
            {title && <div className={styles.title}>{title}</div>}
            {text && <div className={styles.text}>{text}</div>}
        </div>
    )
}

export default Text