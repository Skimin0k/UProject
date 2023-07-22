import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import styles from './Label.module.scss'

interface LabelProps {
    className?: string
}

const Label: FC<LabelProps> = (props) => {
    const {
        className,
        children
    } = props
    return (
        <div
            className={classNames(styles.Label, {}, [className])}
        >
            {children}
        </div>
    )
}

export default Label