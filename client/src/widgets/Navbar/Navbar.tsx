import React, {FC, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import AppLink from 'shared/ui/AppLink/AppLink'
import LanguageSwitcher from 'shared/ui/LanguageSwitcher/LanguageSwitcher'
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ThemeSwitcher'

import {getNavBarItems} from './model/selectors/getNavBarItems'

import styles from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

const Navbar: FC<NavbarProps> = ({className}) => {
    const {t} = useTranslation('translation')
    const NavbarItems = useSelector(getNavBarItems)
    const links = useMemo(() => NavbarItems.map(item => {
        return <div key={item.path} className={classNames('', {}, [styles.container, styles.brackets])}>
            <AppLink to={item.path}>{t(item.name)}</AppLink>
        </div>
    }), [NavbarItems, t])

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <section className={styles.leftSide}>
                <ThemeSwitcher/>
            </section>
            <section className={styles.centralSide}>
                {links}
            </section>
            <section className={styles.rightSide}>
                <LanguageSwitcher/>
            </section>
        </div>
    )
}

export default Navbar