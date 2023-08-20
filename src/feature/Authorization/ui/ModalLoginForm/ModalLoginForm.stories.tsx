import {DeepPartial} from '@reduxjs/toolkit'
import type {Meta, StoryObj} from '@storybook/react'
import {StateSchema} from 'app/StoreProvider'

import {withReduxDecorator} from '../../../../../.storybook/decorators/withReduxDecorator'

import {ModalLoginForm} from './ModalLoginForm'

const meta: Meta<typeof ModalLoginForm> = {
    component: ModalLoginForm
}

export default meta
type Story = StoryObj<typeof ModalLoginForm>;

const emptyForm: DeepPartial<StateSchema> = {
    auth: {
        username: '',
        password: '',
        isLoading: false
    }
}
export const EmptyForm: Story = {
    args: {
        isOpen: true
    },
    decorators: [withReduxDecorator(emptyForm as StateSchema)]
}