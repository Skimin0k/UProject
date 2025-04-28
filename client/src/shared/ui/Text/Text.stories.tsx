import type {Meta, StoryObj} from '@storybook/react'
import {Theme} from 'shared/theme/lib/ThemeContext'

import Text, {ThemeText} from './Text'

const meta: Meta<typeof Text> = {
    component: Text
}

export default meta
type Story = StoryObj<typeof Text>;

export const LightTheme: Story = {
    args: {
        text: 'text',
        title: 'title'
    }
}
export const DarkTheme: Story = {
    args: {
        text: 'text',
        title: 'title'
    },
    parameters: {
        component_theme: Theme.dark
    }
}
export const Error: Story = {
    args: {
        text: 'text',
        title: 'title',
        theme: ThemeText.Error
    }
}
export const OnlyTitle: Story = {
    args: {
        text: 'text'
    }
}
export const OnlyText: Story = {
    args: {
        title: 'title'
    }
}