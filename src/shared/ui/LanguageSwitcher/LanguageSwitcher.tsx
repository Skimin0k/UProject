import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import styles from './LanguageSwitcher.module.scss'
import Button from 'shared/ui/Button/Button'
import {useTranslation} from 'react-i18next'

interface LanguageSwitcherProps {
    className?: string
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = (props) => {
    const {
        className,
        children,
        ...rest
    } = props

    const {t, i18n} = useTranslation()
    const switchLanguage = () => {
        i18n.changeLanguage(i18n.language=== 'ru'? 'en': 'ru')
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