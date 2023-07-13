import React, {FC, useEffect, useState} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import styles from './BubbleButton.module.scss'

interface BubbleButtonProps {
    className?: string
}

const BubbleButton: FC<BubbleButtonProps> = (props) => {
    const [isAnimated, setAnimate] = useState(false)
    const animate = () => {
        if(!isAnimated){
            setAnimate(true)
            setTimeout(() => {
                setAnimate(() => false)
            },700)
        }
    }

    return (
        <button
            className={classNames(styles.BubbleButton, {[styles.animate]: isAnimated})}
            onClick={animate}
            {...props}
            onMouseEnter={(event) => {}}
        >
            Click me!
        </button>
    )
}

export default BubbleButton