import {DeepPartial} from '@reduxjs/toolkit'
import type {Meta, StoryObj} from '@storybook/react'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'

import {withReduxDecorator} from '../../../../../.storybook/decorators/withReduxDecorator'

import {LoginForm} from './LoginForm'

const meta: Meta<typeof LoginForm> = {
    component: LoginForm
}

export default meta
type Story = StoryObj<typeof LoginForm>;

const emptyForm: DeepPartial<StateSchema> = {
    auth: {
        username: '',
        password: '',
        isLoading: false
    }
}
export const EmptyForm: Story = {
    args: {},
    decorators: [withReduxDecorator(emptyForm as StateSchema)]
}

const fullForm: DeepPartial<StateSchema> = {
    auth: {
        username: 'admin',
        password: '123',
        isLoading: false
    }
}
export const FullForm: Story = {
    args: {},
    decorators: [withReduxDecorator(fullForm as StateSchema)]
}
const loading: DeepPartial<StateSchema> = {
    auth: {
        username: 'admin',
        password: '123',
        isLoading: true
    }
}
export const LoadingForm: Story = {
    args: {},
    decorators: [withReduxDecorator(loading as StateSchema)]
}
const error: DeepPartial<StateSchema> = {
    auth: {
        username: 'admin',
        password: '123',
        isLoading: false,
        error: 'error'
    }
}
export const ErrorForm: Story = {
    args: {},
    decorators: [withReduxDecorator(error as StateSchema)]
}