import type {Meta, StoryObj} from '@storybook/react'

import {ArticleText} from './ArticleText'

const meta: Meta<typeof ArticleText> = {
    component: ArticleText
}

export default meta
type Story = StoryObj<typeof ArticleText>;

export const Primary: Story = {
    args: {}
}