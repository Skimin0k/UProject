import React, {memo, useCallback} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Input.module.scss'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'onChange'>{
    onChange: (value: string) => void
}

const InputWithoutMemo = (props: InputProps) => {
    const {onChange, className, ...rest } = props
    const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        onChange(event.target.value)
    }, [onChange])
    return <input
        onChange={onChangeHandler}
        {...rest}
        className={classNames(styles.Input, {}, [className])}
    />
}

export const Input = memo(InputWithoutMemo) as typeof InputWithoutMemo