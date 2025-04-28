import React, {useState, memo, useCallback, useEffect} from 'react';
import { Icons, IconButton } from '@storybook/components';
import { themes } from '@storybook/theming';
import {addons} from "@storybook/manager-api";


export const ThemeSwitcher = memo(() => {
    const [theme, setTheme] = useState(
        window.localStorage.getItem("storybook_global_theme") === 'dark'
            ? themes.dark
            : themes.light
    )

    useEffect(() => {
        addons.setConfig({
            theme: theme,
        });
    },[])

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === themes.dark? themes.light: themes.dark
            addons.setConfig({
                theme: newTheme,
            });
            window.localStorage.setItem("storybook_global_theme", newTheme === themes.dark? 'dark':'light')
            return newTheme
        })
    }, [theme])

    return (
        <IconButton
            key="themeSwitcher"
            title={`Switch theme to ${theme === themes.dark? 'light': 'dark'}`}
            onClick={toggleTheme}
        >
            <Icons icon={theme === themes.dark? "sun": "moon"} />
        </IconButton>
    );
});