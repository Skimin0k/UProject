import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import styles from './StorybookIcons.module.scss'
import {Icons, icons} from '@storybook/components'

interface StorybookIconsProps {
    className?: string
}

const StorybookIcons: FC<StorybookIconsProps> = (props) => {

    return (
        <div
            className={classNames(styles.StorybookIcons, {}, [])}
        >
            {Object.keys(icons).map((icon) => {
                return <div key={icon} className={styles.IconItem}>
                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/*@ts-ignore*/}
                    <Icons icon={icon} className={styles.Icon}/>
                    {icon}
                </div>
            })}
        </div>
    )
}

export default StorybookIcons