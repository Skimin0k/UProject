import React, {ChangeEvent, memo, useCallback} from 'react'
import {Currency} from 'entities/Currency'
import {Select} from 'shared/ui/Select/Select'

interface CurrencySelectorProps {
    className?: string,
    onChange: (value: Currency) => void,
    selected?: Currency,
    readOnly?: boolean
}

export const CurrencySelector = memo((props: CurrencySelectorProps) => {
    const {
        onChange,
        selected,
        readOnly
    } = props

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event.target.value as Currency)
    },[onChange])

    return (
        <Select
            options={[{
                content:Currency.EUR,
                value:Currency.EUR,
            },{
                content:Currency.RUB,
                value:Currency.RUB,
            },{
                content:Currency.USD,
                value:Currency.USD,
            },
            ]}
            selected={selected}
            onChange={onChangeHandler}
            readOnly={readOnly}
        />
    )
})
