import React, {FC, useMemo, useState} from 'react'
import {__LOCAL_STORAGE_THEME_KEY} from 'shared/const/constants'

import ThemeContext, {Theme} from './ThemeContext'

const ThemeProvider: FC = ({children}) => {
    const [theme, setTheme] = useState<Theme>(window.localStorage.getItem(__LOCAL_STORAGE_THEME_KEY) as Theme || Theme.light)
    const props = useMemo(() => ({theme: theme, setTheme: setTheme}), [theme])
    return (
        <ThemeContext.Provider value={props}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider