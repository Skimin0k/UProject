import React, {FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import styles from './Navbar.module.scss'
import {routePaths, Routes} from 'shared/config/routeConfig/routerConfig'
import AppLink from 'shared/ui/AppLink/AppLink'
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ThemeSwitcher'
import LanguageSwitcher from 'shared/ui/LanguageSwitcher/LanguageSwitcher'
import {useTranslation} from 'react-i18next'

interface NavbarProps {
    className?: string
}

const Navbar :FC<NavbarProps> = ({className}) => {
    const {t} = useTranslation('translation')
    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <ThemeSwitcher/>
            <LanguageSwitcher/>
            <div className = {styles.links}>
                <AppLink to={routePaths[Routes.MAIN]}>{t('link to main')}</AppLink>
                <AppLink to={routePaths[Routes.ABOUT]}>{t('link to about')}</AppLink>
            </div>
        </div>
    )
}

export default Navbar