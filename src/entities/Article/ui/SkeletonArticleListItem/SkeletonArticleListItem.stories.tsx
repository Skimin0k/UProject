import type {Meta, StoryObj} from '@storybook/react'
import {ArticlesListView} from 'entities/Article'
import {Theme} from 'shared/theme/lib/ThemeContext'

import {SkeletonArticleListItem} from './SkeletonArticleListItem'

const meta: Meta<typeof SkeletonArticleListItem> = {
    component: SkeletonArticleListItem
}

export default meta
type Story = StoryObj<typeof SkeletonArticleListItem>;

export const List: Story = {
    args: {
        view: ArticlesListView.LIST
    }
}
export const DarkList: Story = {
    args: {
        view: ArticlesListView.LIST
    },
    parameters: {
        component_theme: Theme.dark
    }
}
export const Plate: Story = {
    args: {
        view: ArticlesListView.PLATE
    }
}
export const DarkPlate: Story = {
    args: {
        view: ArticlesListView.PLATE
    },
    parameters: {
        component_theme: Theme.dark
    }
}