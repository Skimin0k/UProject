import {useContext} from 'react'

import ThemeContext, {IThemeContext, Theme} from './ThemeContext'


const useTheme = () => {
    const {theme, setTheme} = useContext<IThemeContext>(ThemeContext)
    const toggleTheme = () => {
        setTheme((prevState) => {
            const newTheme = prevState === Theme.light ? Theme.dark : Theme.light
            window.localStorage.setItem(process.env.LOCAL_STORAGE_THEME_KEY, newTheme)
            return newTheme
        })
    }
    return {theme, toggleTheme}
}
export default useTheme