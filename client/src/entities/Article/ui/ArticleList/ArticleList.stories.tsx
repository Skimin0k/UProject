import type {Meta, StoryObj} from '@storybook/react'
import {ArticlesListView} from 'entities/Article'
import {List} from 'entities/Article/ui/ArticleListItem/ArticleListItem.stories'

import {ArticleList} from './ArticleList'

const meta: Meta<typeof ArticleList> = {
    component: ArticleList
}

export default meta
type Story = StoryObj<typeof ArticleList>;

export const ArticleListList: Story = {
    args: {
        isLoading: false,
        view: ArticlesListView.LIST,
        articles: [
            ...Array(3).fill(List.args?.article)
        ]
    }
}
export const ArticleListPlate: Story = {
    args: {
        isLoading: false,
        view: ArticlesListView.PLATE,
        articles: [
            ...Array(3).fill(List.args?.article)
        ]
    }
}