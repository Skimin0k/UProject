import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Theme} from 'shared/theme/lib/ThemeContext'

import { Skeleton } from './Skeleton'

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Normal = Template.bind({})
Normal.args = {
    width: 100,
    height: 100,
}

export const Circle = Template.bind({})
Circle.args = {
    border: '50%',
    width: 100,
    height: 100,
}

export const NormalDark = Template.bind({})
NormalDark.args = Normal.args
NormalDark.parameters = {
    component_theme: Theme.dark
}
export const CircleDark = Template.bind({})
CircleDark.args = Circle.args
CircleDark.parameters = {
    component_theme: Theme.dark
}
