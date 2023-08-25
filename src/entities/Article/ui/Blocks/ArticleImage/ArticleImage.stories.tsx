import type {Meta, StoryObj} from '@storybook/react'

import {ArticleImage} from './ArticleImage'

const meta: Meta<typeof ArticleImage> = {
    component: ArticleImage
}

export default meta
type Story = StoryObj<typeof ArticleImage>;

export const Primary: Story = {
    args: {}
}