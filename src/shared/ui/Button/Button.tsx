import React, {ButtonHTMLAttributes, FC} from 'react';
import classNames from "shared/lib/classNames/classNames";


import styles from "./Button.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string
}

enum ButtonThemes {
    CLEARED='clear'
}

const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        ...rest
    } = props
    return (
        <button
            className={classNames(styles.Button, {}, [className, styles[ButtonThemes.CLEARED]])}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;