import React, { FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Currency, CurrencySelector} from 'entities/Currency'
import classNames from 'shared/lib/classNames/classNames'
import {Image} from 'shared/ui/Image/Image'
import Input from 'shared/ui/Input/Input'
import Text, {TextAlign, ThemeText} from 'shared/ui/Text/Text'

import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string,

    firstname: string,
    lastname: string,
    age: number,
    currency: Currency,
    avatar: string,

    onChangeFirstname: (value: string) => void,
    onChangeLastname: (value: string) => void,
    onChangeAge: (value: string) => void,
    onChangeAvatar: (value: string) => void,
    onChangeCurrency: (event: Currency) => void,

    isLoading?: boolean,
    error?: string,
    readOnly?: boolean
}

const ProfileCard: FC<ProfileCardProps> = (props) => {
    const {t} = useTranslation()
    const {
        className,
        firstname,
        lastname,
        age,
        currency,
        avatar,
        onChangeAge,
        onChangeCurrency,
        onChangeFirstname,
        onChangeLastname,
        onChangeAvatar,
        isLoading,
        error,
        readOnly
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
            <div className={styles.ImageWrapper}>
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <Image src={avatar} alt={'._.'} size={'125px'}/>
            </div>
            <Input
                placeholder={t('firstname')}
                value={firstname}
                onChange={onChangeFirstname}
                readOnly={readOnly}
            />
            <Input
                placeholder={t('lastname')}
                value={lastname}
                onChange={onChangeLastname}
                readOnly ={readOnly}
            />
            <Input
                placeholder={t('age')}
                value={age}
                onChange={onChangeAge}
                readOnly ={readOnly}
            />
            <CurrencySelector
                selected={currency}
                onChange={onChangeCurrency}
                readOnly={readOnly}
            />
            <Input
                placeholder={t('avatar')}
                value={avatar}
                onChange={onChangeAvatar}
                readOnly ={readOnly}
            />
        </div>
    )
}

export default ProfileCard