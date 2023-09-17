import React, { memo, useCallback, useMemo} from 'react'
import {Currency} from 'entities/Currency'
import {OptionType, Select} from 'shared/ui/Select/Select'

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

    const onChangeHandler = useCallback((value: Currency) => {
        onChange?.(value)
    },[onChange])

    const options = useMemo<OptionType<Currency>[]>(() => [{
        content:Currency.EUR,
        value:Currency.EUR,
    },
    {
        content:Currency.RUB,
        value:Currency.RUB,
    },
    {
        content:Currency.USD,
        value:Currency.USD,
    },
    ], [])

    return (
        <Select<Currency>
            options={options}
            selected={selected}
            onChange={onChangeHandler}
            readOnly={readOnly}
        />
    )
})
