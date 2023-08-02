import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import Button from 'shared/ui/Button/Button'

import styles from './LanguageSwitcher.module.scss'

interface LanguageSwitcherProps {
    className?: string
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = (props) => {
    const {
        className,
        ...rest
    } = props

    const {t, i18n} = useTranslation()
    const switchLanguage = async () => {
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <Button
            className={classNames(styles.LanguageSwitcher, {}, [className])}
            onClick={switchLanguage}
            {...rest}
        >
            {t('translate')}
        </Button>
    )
}

export default LanguageSwitcher