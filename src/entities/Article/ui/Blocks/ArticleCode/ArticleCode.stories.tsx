import type {Meta, StoryObj} from '@storybook/react'
import {BlockType} from 'entities/Article/model/types/article'

import {ArticleCode} from './ArticleCode'

const meta: Meta<typeof ArticleCode> = {
    component: ArticleCode
}

export default meta
type Story = StoryObj<typeof ArticleCode>;

export const Primary: Story = {
    args: {
        block: {
            'id': '4',
            'type': BlockType.CODE,
            'code': '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;'
        }
    }
}