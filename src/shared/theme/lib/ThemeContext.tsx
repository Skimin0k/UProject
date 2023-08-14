import React, {createContext} from 'react'

export enum Theme {
    light = 'light',
    dark = 'dark',
}

export interface IThemeContext{
    theme?: Theme,
    setTheme?:  React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<IThemeContext>({theme: Theme.light})

export default ThemeContext