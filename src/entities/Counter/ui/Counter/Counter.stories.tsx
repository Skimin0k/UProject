import {DeepPartial} from '@reduxjs/toolkit'
import type {Meta, StoryObj} from '@storybook/react'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'

import {withReduxDecorator} from '../../../../../.storybook/decorators/withReduxDecorator'

import {Counter} from './Counter'

const initState: DeepPartial<StateSchema> = {
    counter: {
        value: 0
    }
}

const meta: Meta<typeof Counter> = {
    component: Counter,
    decorators: [
        withReduxDecorator(initState as StateSchema)
    ]
}

export default meta
type Story = StoryObj<typeof Counter>;

export const Primary: Story = {
    args: {}
}