import type {Meta, StoryObj} from '@storybook/react'
import ThemeSwitcher from './ThemeSwitcher'
import {Theme} from 'shared/theme/lib/ThemeContext'
const meta: Meta<typeof ThemeSwitcher> =  {
    component: ThemeSwitcher
}
export default meta

type Story = StoryObj<typeof ThemeSwitcher>;

export const DarkTheme: Story = {
    render: () => <ThemeSwitcher/>,
    parameters: {
        component_theme: Theme.dark
    }
}
export const LightTheme: Story = {
    render: () => <ThemeSwitcher/>,
    parameters: {
        component_theme: Theme.light,
    }
}