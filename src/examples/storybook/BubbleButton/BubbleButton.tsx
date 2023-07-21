import React, {FC, useState} from 'react'
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
        >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {/* eslint-disable-next-line i18next/no-literal-string */}
                Click me!
        </button>
    )
}

export default BubbleButton