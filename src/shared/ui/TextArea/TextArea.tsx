import React, {memo, useCallback} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './TextArea.module.scss'

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,'onChange'>{
    onChange: (value: string) => void
}

const TextAreaWithoutMemo = (props: TextAreaProps) => {
    const {onChange, className, ...rest } = props
    const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement>  = useCallback((event) => {
        onChange(event.target.value)
    }, [onChange])
    return <textarea
        onChange={onChangeHandler}
        {...rest}
        className={classNames(styles.TextArea, {}, [className])}
    />
}

export const TextArea = memo(TextAreaWithoutMemo) as typeof TextAreaWithoutMemo