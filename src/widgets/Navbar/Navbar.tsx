import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {routePaths, Routes} from 'shared/config/routeConfig/routerConfig'
import classNames from 'shared/lib/classNames/classNames'
import AppLink from 'shared/ui/AppLink/AppLink'
import LanguageSwitcher from 'shared/ui/LanguageSwitcher/LanguageSwitcher'
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ThemeSwitcher'

import styles from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

const Navbar: FC<NavbarProps> = ({className}) => {
    const {t} = useTranslation('translation')
    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <section className={styles.leftSide}>
                <ThemeSwitcher/>
            </section>
            <section className={styles.centralSide}>
                {Object.values(Routes).map(route => {
                    return <div key={route} className={classNames('',{}, [styles.container, styles.brackets])}>
                        <AppLink to={routePaths[route]}>{t(route)}</AppLink>
                    </div>
                })}
            </section>
            <section className={styles.rightSide}>
                <LanguageSwitcher/>
            </section>
        </div>
    )
}

export default Navbar