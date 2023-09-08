import type {Meta, StoryObj} from '@storybook/react'
import {BlockType, TextBlock} from 'entities/Article/model/types/article'

import {ArticleText} from './ArticleText'

const meta: Meta<typeof ArticleText> = {
    component: ArticleText
}

export default meta
type Story = StoryObj<typeof ArticleText>;

const block: TextBlock = {
    id: '1',
    type: BlockType.TEXT,
    title: 'Заголовок этого блока',
    paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
    ]
}
export const SimpleParagraphs: Story = {
    args: {
        block: block
    }
}