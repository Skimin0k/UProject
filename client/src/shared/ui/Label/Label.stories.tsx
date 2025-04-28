import type {Meta, StoryObj} from '@storybook/react'
import {Theme} from 'shared/theme/lib/ThemeContext'

import Label from './Label'

const meta: Meta<typeof Label> = {
    component: Label
}

export default meta
type Story = StoryObj<typeof Label>;

export const ThemeDark: Story = {
    // eslint-disable-next-line i18next/no-literal-string
    render: () => <Label>Something</Label>,
    parameters: {
        component_theme: Theme.dark
    }
}
export const ThemeLight: Story = {
    // eslint-disable-next-line i18next/no-literal-string
    render: () => <Label>Something</Label>,
    parameters: {
        component_theme: Theme.light
    }
}