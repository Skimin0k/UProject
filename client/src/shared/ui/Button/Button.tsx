import React, {ButtonHTMLAttributes, FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string,
    theme?: ButtonThemes
}

export enum ButtonThemes {
    CLEARED='clear',
    OUTLINE='outline'
}

const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        onClick,
        theme = ButtonThemes.CLEARED
    } = props
    return (
        <button
            className={classNames(styles.Button, {}, [className, styles[ButtonThemes.CLEARED], styles[theme]])}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button