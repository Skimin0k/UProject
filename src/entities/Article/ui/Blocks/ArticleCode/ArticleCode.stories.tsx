import type {Meta, StoryObj} from '@storybook/react'

import {ArticleCode} from './ArticleCode'

const meta: Meta<typeof ArticleCode> = {
    component: ArticleCode
}

export default meta
type Story = StoryObj<typeof ArticleCode>;

export const Primary: Story = {
    args: {}
}