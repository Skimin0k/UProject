import type {Meta, StoryObj} from '@storybook/react'
import {BlockType} from 'entities/Article/model/types/article'

import {ArticleImage} from './ArticleImage'

const meta: Meta<typeof ArticleImage> = {
    component: ArticleImage
}

export default meta
type Story = StoryObj<typeof ArticleImage>;

export const Primary: Story = {
    args: {
        block: {
            'id': '2',
            'type': BlockType.IMAGE,
            'src': 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
            'title': 'Рисунок 1 - скриншот сайта'
        }
    }
}