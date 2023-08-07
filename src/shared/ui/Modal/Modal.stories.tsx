import type {Meta, StoryObj} from '@storybook/react'
import {Theme} from 'shared/theme/lib/ThemeContext'

import Modal from './Modal'

const meta: Meta<typeof Modal> = {
    component: Modal,
    args: {
        isOpen: true
    },
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        onClickOutside: {
            action: 'clicked'
        }
    }
}

export default meta
type Story = StoryObj<typeof Modal>;

export const Light: Story = {
    args: {
        children: <div>There is a modal window</div>
    },
    parameters: {
        component_theme: Theme.light
    }
}
export const Dark: Story = {
    args: {
        children: <div>There is a modal window</div>
    },
    parameters: {
        component_theme: Theme.dark
    }
}