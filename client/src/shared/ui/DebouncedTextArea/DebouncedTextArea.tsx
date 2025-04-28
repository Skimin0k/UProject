import React, {memo, useCallback, useEffect, useState} from 'react'
import {useDebounce} from 'shared/lib/hooks/useDebounce/useDebounce'
import {TextArea, TextAreaProps} from 'shared/ui/TextArea/TextArea'

interface DebouncedTextAreaProps extends TextAreaProps {
    delay: number,
}

export const DebouncedTextAreaWithoutMemo = memo((props: DebouncedTextAreaProps) => {
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
        <TextArea
            {...rest}
            onChange={onChangeHandler}
            value={state}
        />
    )
})
export const DebouncedTextArea = memo(DebouncedTextAreaWithoutMemo) as typeof DebouncedTextAreaWithoutMemo