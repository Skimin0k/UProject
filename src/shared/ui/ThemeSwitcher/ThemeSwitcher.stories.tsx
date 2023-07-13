import type {Meta, StoryObj} from '@storybook/react'
import ThemeSwitcher from './ThemeSwitcher'
import {ThemeProvider} from 'shared/theme'
const meta: Meta<typeof ThemeSwitcher> =  {
    component: ThemeSwitcher
}
export default meta

type Story = StoryObj<typeof ThemeSwitcher>;

export const Primary: Story = {
    render: () => <ThemeProvider>
        <ThemeSwitcher/>
    </ThemeProvider>
}