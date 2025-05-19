import React from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './LotCard.module.scss'

interface LotCardProps {
    className?: string,
    title: string,
    price: string,
    symbol: string
}

export const LotCard = (props: LotCardProps) => {
    const {
        className,
        title,
        symbol,
        price
    } = props

    return (
        <div
            className={classNames(styles.Select, {}, [className])}
        >
            <div>
                {title}
            </div>
            <div>
                {symbol}
            </div>
            <div>
                {price}
            </div>
        </div>
    )
}