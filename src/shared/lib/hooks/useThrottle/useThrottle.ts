import {useCallback, useRef} from 'react'

export const useThrottle = (callback: (...args: any) => void, delay: number) => {
    const isCallable = useRef(true)
    return useCallback((...args: any[]) => {
        if(isCallable.current) {
            callback(...args)
            isCallable.current = false

            setTimeout(() => {
                isCallable.current = true
            }, delay)
        }
    },[callback, delay])
}