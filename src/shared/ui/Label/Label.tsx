import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import styles from './Label.module.scss'
import {useTranslation} from 'react-i18next'

interface LabelProps {
    className?: string,
    text: string,
}

const Label: FC<LabelProps> = (props) => {
    const {
        className,
        text,
        ...rest
    } = props
    const {t}= useTranslation()
    return (
        <div
            className={classNames(styles.Label, {}, [className])}
            {...rest}
        >
            {t(text)}
        </div>
    )
}

export default Label