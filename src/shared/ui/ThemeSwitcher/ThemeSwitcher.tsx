import React, { FC} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import {useTheme} from 'shared/theme'
import Button from 'shared/ui/Button/Button'

import DarkTheme from 'assets/icons/theme-dark.svg'
import LightTheme from 'assets/icons/theme-light.svg'
import {Theme} from 'shared/theme/lib/ThemeContext'


import styles from './ThemeSwitcher.module.scss'

interface ThemeSwitcherProps {
    className?: string
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
    const {className} = props
    const {theme, toggleTheme} = useTheme()

    return (
        <Button
            className={classNames(styles.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.light
                ? <LightTheme/>
                : <DarkTheme/>}
        </Button>
    )
}

export default ThemeSwitcher