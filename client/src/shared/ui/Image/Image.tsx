import {CSSProperties, ImgHTMLAttributes, memo} from 'react'

import styles from './Image.module.scss'
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    size: string
}
export const Image = memo((props:ImageProps) => {
    const {
        src,
        alt,
        size
    } = props
    const InlineStyles: CSSProperties = {
        width: size,
        height: size,
    }
    return <img
        src={src}
        alt={alt}
        style={InlineStyles}
        className={styles.Image}
    />
})