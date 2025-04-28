import React, {FC, useCallback, useEffect, useRef} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import Portal from 'shared/ui/Portal/Portal'

import styles from './Modal.module.scss'

interface ModalProps {
    className?: string,
    isOpen?: boolean,
    onClickOutside?: () => void
}

const Modal: FC<ModalProps> = (props) => {
    const {
        children,
        isOpen = false,
        onClickOutside
    } = props

    const ref = useRef<HTMLDivElement | null>(null)
    const handleClickOutside = useCallback(() => {
        if (ref.current) {
            ref.current.className = ref.current.className + ` ${styles.closing}`
            setTimeout(() => {
                if (ref.current)
                    ref.current.className = ref.current.className.split(' ').filter((item: string) => item !== styles.closing).join(' ')
                onClickOutside && onClickOutside()
            }, 800)
        }
    }, [onClickOutside])

    useEffect(() => {
        const handleKeydown = (event: { key: string }) => {
            if (event.key === 'Escape') handleClickOutside()
        }

        window.addEventListener('keydown', handleKeydown, true)
        return () => {
            window.removeEventListener('keydown', handleKeydown, true)
        }
    }, [handleClickOutside])

    return (
        <Portal>
            <div
                className={classNames(styles.ModalWrapper, {[styles.opened]: isOpen})}
                onClick={handleClickOutside}
            >
                <div
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                    className={classNames(styles.Modal)}
                    ref={ref}
                >
                    <div className={styles.innerChildrenWrapper}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default Modal