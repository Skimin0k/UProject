import React, {FC, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {getAuthData} from 'entities/User'
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
    const links = useMemo(() => [Routes.MAIN, Routes.ARTICLES_LIST].map(route => {
        return <div key={route} className={classNames('', {}, [styles.container, styles.brackets])}>
            <AppLink to={routePaths[route]}>{t(route)}</AppLink>
        </div>
    }), [t])
    const userData = useSelector(getAuthData)
    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <section className={styles.leftSide}>
                <ThemeSwitcher/>
            </section>
            <section className={styles.centralSide}>
                {links}
                {userData?.id && <div key={Routes.PROFILE} className={classNames('', {}, [styles.container, styles.brackets])}>
                    <AppLink to={routePaths[Routes.PROFILE]+userData?.id}>{t(Routes.PROFILE)}</AppLink>
                </div>}
                
            </section>
            <section className={styles.rightSide}>
                <LanguageSwitcher/>
            </section>
        </div>
    )
}

export default Navbar