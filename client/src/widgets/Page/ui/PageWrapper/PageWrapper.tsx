import React, {memo, ReactNode, UIEvent, useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import {getScrollPosition, UIActions} from 'feature/UI'
import classNames from 'shared/lib/classNames/classNames'
import {useIntersectionObserver} from 'shared/lib/hooks/useIntersectionObserver/useIntersectionObserver'
import {useThrottle} from 'shared/lib/hooks/useThrottle/useThrottle'

import styles from './PageWrapper.module.scss'

interface PageWrapperProps {
    className?: string,
    onScrollEnd?: () => void,
    children: ReactNode
}

export const PageWrapper = memo((props: PageWrapperProps) => {
    const {
        className,
        onScrollEnd,
        children
    } = props

    const targetElement = useRef() as React.MutableRefObject<HTMLDivElement>
    const rootElement = useRef() as React.MutableRefObject<HTMLDivElement>
    const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const dispatch = useAppDispatch()
    const {pathname} = useLocation()

    useIntersectionObserver({
        callback: onScrollEnd,
        targetElement,
        rootElement
    })

    const onScrollHandler = useThrottle((event: UIEvent<HTMLDivElement>) => {
        dispatch(UIActions.saveScroll({path: pathname, position: event.currentTarget.scrollTop}))
    }, 500)
    // const onScrollHandler = useDebounce(
    //     (event: UIEvent<HTMLDivElement>) => {
    //         dispatch(UIActions.saveScroll({path: pathname, position: (event.target as HTMLElement).scrollTop}))
    //     }, 500)

    const scrollPosition = useSelector(getScrollPosition(pathname))
    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    }, [scrollPosition])

    return (
        <div
            className={classNames(styles.PageWrapper, {}, [className])}
            onScroll={onScrollHandler}
            ref={wrapperRef}
        >
            {children}
            {onScrollEnd && <div ref={targetElement} style={{height: '1px'}}/>}
        </div>
    )
})