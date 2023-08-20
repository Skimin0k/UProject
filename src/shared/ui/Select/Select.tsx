import React, {ChangeEvent, memo, useCallback, useMemo} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Select.module.scss'

interface OptionType {
    value: string,
    content: string,
}
interface SelectProps extends Omit<React.InputHTMLAttributes<HTMLSelectElement>,''>{
    className?: string,
    options: OptionType[],
    selected?: string,
    readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
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
        if(onChange) onChange(event)
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
})