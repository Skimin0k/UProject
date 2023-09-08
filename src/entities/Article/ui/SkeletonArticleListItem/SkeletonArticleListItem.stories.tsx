import type {Meta, StoryObj} from '@storybook/react'

import SkeletonArticleListItem from './SkeletonArticleListItem'

const meta: Meta<typeof SkeletonArticleListItem> = {
    component: SkeletonArticleListItem
}

export default meta
type Story = StoryObj<typeof SkeletonArticleListItem>;

export const Primary: Story = {
    args: {}
}