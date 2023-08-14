import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

const Sidebar: FC<SidebarProps> = (props) => {
    const {
        className,
        children,
        ...rest
    } = props
    return (
        <div
            className={classNames(styles.Sidebar, {}, [className])}
            {...rest}
        >
            {children}
        </div>
    )
}

export default Sidebar