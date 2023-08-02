import React, {FC} from 'react'
import {Link, LinkProps} from 'react-router-dom'
import classNames from 'shared/lib/classNames/classNames'

import styles from './AppLink.module.scss'

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