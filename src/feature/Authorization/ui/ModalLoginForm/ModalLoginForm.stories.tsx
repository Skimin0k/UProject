import type {Meta, StoryObj} from '@storybook/react'

import {ModalLoginForm} from './ModalLoginForm'

const meta: Meta<typeof ModalLoginForm> = {
    component: ModalLoginForm
}

export default meta
type Story = StoryObj<typeof ModalLoginForm>;

export const Primary: Story = {
    args: {}
}