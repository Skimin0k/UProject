import React, {ChangeEvent, useCallback, useMemo} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Select.module.scss'

export interface OptionType<T extends string> {
    value: T,
    content: string,
}
interface SelectProps<T extends string> extends Omit<React.InputHTMLAttributes<HTMLSelectElement>,'onChange'>{
    className?: string,
    options: OptionType<T>[],
    selected?: T,
    readOnly?: boolean,
    onChange: (value: T) => void
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        onChange,
        options,
        selected,
        readOnly=true
    } = props

    const elements = useMemo(() => {
        return options.map((opt) =>
            <option
                key={opt.value}
                value={opt.value}
                className={styles.option}
                selected={opt.value === selected}
            >
                {opt.content}
            </option>)
    }, [selected, options])

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        if(onChange) onChange(event.target.value as T)
    }, [onChange])

    return (
        <select
            className={classNames(styles.Select, {}, [className])}
            onChange={onChangeHandler}
            disabled={readOnly}
        >
            {elements}
        </select>
    )
}