import type {Meta, StoryObj} from '@storybook/react'

import PageWrapper from './PageWrapper'

const meta: Meta<typeof PageWrapper> = {
    component: PageWrapper
}

export default meta
type Story = StoryObj<typeof PageWrapper>;

export const Primary: Story = {
    args: {}
}