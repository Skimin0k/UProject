import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import styles from './AppLink.module.scss'
import {Link, LinkProps} from 'react-router-dom'

interface AppLinkProps extends LinkProps {
    className?: string,
}

const AppLink :FC<AppLinkProps> = (props) => {
    const {className, children, to, ...rest} = props
    return (
        <Link
            to={to}
            className={classNames(styles.AppLink, {}, [className])}
            {...rest}
        >
            {children}
        </Link>
    )
}

export default AppLink