import type {Meta, StoryObj} from '@storybook/react'
import {Theme} from 'shared/theme/lib/ThemeContext'

import {Select} from './Select'

const meta: Meta<typeof Select> = {
    component: Select
}

export default meta
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
    args: {
        options: [
            {
                content: 'content_1',
                value: 'value_1'
            },
            {
                content: 'content_2',
                value: 'value_2'
            },
            {
                content: 'content_3',
                value: 'value_3'
            }
        ],
        readOnly: false
    }
}
export const PrimaryDark: Story = {
    args: {
        ...Primary.args
    },
    parameters: {
        component_theme: Theme.dark
    }
}
export const ReadOnly: Story = {
    args: {
        options: [
            {
                content: 'content_1',
                value: 'value_1'
            }
        ],
        readOnly: true
    }
}
export const ReadOnlyDark: Story = {
    args: {
        ...ReadOnly.args
    },
    parameters: {
        component_theme: Theme.dark
    }
}
export const Selected: Story = {
    args: {
        ...Primary.args,
        selected: '1'
    }
}