import React, {ChangeEvent, FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Currency, CurrencySelector} from 'entities/Currency'
import classNames from 'shared/lib/classNames/classNames'
import Input from 'shared/ui/Input/Input'
import Text, {TextAlign, ThemeText} from 'shared/ui/Text/Text'

import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string,

    firstname: string,
    lastname: string,
    age: number,
    currency: Currency,

    onChangeFirstname: (event: ChangeEvent<HTMLInputElement>) => void,
    onChangeLastname: (event: ChangeEvent<HTMLInputElement>) => void,
    onChangeAge: (event: ChangeEvent<HTMLInputElement>) => void,
    onChangeCurrency: (event: Currency) => void,

    isLoading?: boolean,
    error?: string,
    readonly?: boolean
}

const ProfileCard: FC<ProfileCardProps> = (props) => {
    const {t} = useTranslation()
    const {
        className,
        firstname,
        lastname,
        age,
        currency,
        onChangeAge,
        onChangeCurrency,
        onChangeFirstname,
        onChangeLastname,
        isLoading,
        error,
        readonly
    } = props

    if (isLoading) {
        return <div
            className={classNames(styles.ProfileCard, {}, [className])}
        >
            <Text
                text={t('loading')}
                align={TextAlign.CENTER}
            />
        </div>
    }

    if (error) {
        return <div
            className={classNames(styles.ProfileCard, {}, [className])}
        >
            <Text
                title={t('error')}
                text={error}
                theme={ThemeText.Error}
                align={TextAlign.CENTER}
            />
        </div>
    }

    return (
        <div
            className={classNames(styles.ProfileCard, {}, [className])}
        >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <div>avatar</div>
            <Input
                placeholder={t('firstname')}
                value={firstname}
                onChange={onChangeFirstname}
                readOnly={readonly}
            />
            <Input
                placeholder={t('lastname')}
                value={lastname}
                onChange={onChangeLastname}
                readOnly ={readonly}
            />
            <Input
                placeholder={t('age')}
                value={age}
                onChange={onChangeAge}
                readOnly ={readonly}
            />
            <CurrencySelector
                selected={currency}
                onChange={onChangeCurrency}
                readOnly={readonly}
            />
        </div>
    )
}

export default ProfileCard