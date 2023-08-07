import React, {FC, ReactNode, useCallback, useState} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './BubbleButton.module.scss'

interface BubbleButtonProps {
    className?: string,
    children: ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const BubbleButton: FC<BubbleButtonProps> = (props) => {
    const {children, onClick} = props
    const [isAnimated, setAnimate] = useState(false)

    const animate = useCallback(() => {
        if(!isAnimated){
            setAnimate(true)
            setTimeout(() => {
                setAnimate(() => false)
            },700)
        }
    }, [isAnimated])

    const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        animate()
        onClick(event)
    }, [animate, onClick])

    return (
        <button
            className={classNames(styles.BubbleButton, {[styles.animate]: isAnimated})}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default BubbleButton