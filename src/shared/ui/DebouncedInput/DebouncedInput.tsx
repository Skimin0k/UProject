import React, {memo, useCallback, useEffect, useState} from 'react'
import {useDebounce} from 'shared/lib/hooks/useDebounce/useDebounce'
import  {Input,InputProps} from 'shared/ui/Input/Input'

interface DebouncedInputProps extends InputProps {
    delay: number
}

export const DebouncedInput = memo((props: DebouncedInputProps) => {
    const {
        value,
        onChange,
        delay,
        ...rest
    } = props
    const [state, setState] = useState(value)
    useEffect(() => {
        setState(value)
    }, [value])
    const debouncedOnChange = useDebounce(onChange, delay)
    const onChangeHandler = useCallback((newValue) => {
        setState(newValue)
        debouncedOnChange(newValue)
    }, [debouncedOnChange])
    
    return (
        <Input
            {...rest}
            onChange={onChangeHandler}
            value={state}
        />
    )
})