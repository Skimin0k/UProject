import React, {ChangeEvent, OptionHTMLAttributes, useCallback, useMemo} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Select.module.scss'

export interface OptionType<T extends string> extends OptionHTMLAttributes<HTMLOptionElement> {
    value: string,
    content: T,
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
        return options.map(({value, content, ...rest}) =>
            <option
                key={value}
                value={value}
                className={styles.option}
                {...rest}
            >
                {content}
            </option>)
    }, [options])

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        if(onChange) onChange(event.target.value as T)
    }, [onChange])

    return (
        <select
            className={classNames(styles.Select, {}, [className])}
            onChange={onChangeHandler}
            disabled={readOnly}
            value={selected}
        >
            {elements}
        </select>
    )
}