import React, { useCallback, useEffect, useRef} from 'react'

export interface useIntersectionObserverProps {
    callback?: () => void,
    isOnce?: boolean,

    rootElement: React.MutableRefObject<HTMLDivElement>,
    targetElement: React.MutableRefObject<HTMLDivElement>,
}
export const useIntersectionObserver = (props: useIntersectionObserverProps) => {
    const {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        callback = () => {},
        isOnce,
        rootElement,
        targetElement
    } = props
    const observer = useRef<IntersectionObserver | null>(null)
    
    const IOCallback: IntersectionObserverCallback = useCallback((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                callback()
                if(isOnce) observer.unobserve(entry.target)
            }
        })
    }, [callback, isOnce])

    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: rootElement.current,
            threshold: 0,
            rootMargin: '0px',
        }
        observer.current = new IntersectionObserver(IOCallback, options)
        if (targetElement.current) observer.current?.observe(targetElement.current)

        return () => {
            observer.current?.disconnect()
        }
    },[IOCallback, rootElement, targetElement])
}