import React, { FC} from 'react';
import classNames from "shared/lib/classNames/classNames";
import styles from "./ThemeSwitcher.module.scss"
import {useTheme} from "shared/theme";
import DarkTheme from 'assets/icons/theme-dark.svg'
import ulrLightTheme from 'assets/icons/theme-light.svg?url'
import {Theme} from "shared/theme/lib/ThemeContext";
import Button from "shared/ui/Button/Button";

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
                    ? <img alt={"light theme button"} src={ulrLightTheme}/>
                    : <DarkTheme/>}
        </Button>
    );
};

export default ThemeSwitcher;