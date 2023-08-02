import type {Meta, StoryObj} from '@storybook/react'

import StorybookIcons from './StorybookIcons'

const meta: Meta<typeof StorybookIcons> = {
    component: StorybookIcons
}

export default meta
type Story = StoryObj<typeof StorybookIcons>;

export const Primary: Story = {
    args: {}
}