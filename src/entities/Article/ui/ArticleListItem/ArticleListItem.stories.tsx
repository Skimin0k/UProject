import type {Meta, StoryObj} from '@storybook/react'

import {ArticleListItem} from './ArticleListItem'

const meta: Meta<typeof ArticleListItem> = {
    component: ArticleListItem
}

export default meta
type Story = StoryObj<typeof ArticleListItem>;

export const Primary: Story = {
    args: {}
}