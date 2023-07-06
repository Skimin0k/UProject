import React, {FC} from 'react';
import classNames from "shared/lib/classNames/classNames";
import styles from "./Button.module.scss"

interface ButtonProps {
    className?: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}

enum ButtonThemes {
    CLEARED='cleared'
}

const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        onClick,
        children,
        ...rest
    } = props
    return (
        <button
            className={classNames(styles.Button, {}, [className, styles[ButtonThemes.CLEARED], '123'])}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;