import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Text.module.scss'

interface TextProps {
    className?: string,
    title?: string,
    text?: string,
    theme?: ThemeText,
    align?: TextAlign
}

export enum ThemeText {
    Primary = 'primary',
    Error = 'error'
}

export enum TextAlign {
    CENTER='center',
    LEFT='left',
    RIGHT='right',
}
const Text: FC<TextProps> = (props) => {
    const {
        className,
        title,
        text,
        theme = ThemeText.Primary,
        align = TextAlign.LEFT
    } = props
    return (
        <div
            className={classNames(styles.Text, {[styles[theme]]: true}, [className])}
        >
            {title && <div className={classNames(styles.title, {}, [styles[align]])}>{title}</div>}
            {text && <div className={classNames(styles.text, {}, [styles[align]])}>{text}</div>}
        </div>
    )
}

export default Text