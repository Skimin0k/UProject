import type {Meta, StoryObj} from '@storybook/react'
import {userEvent, within} from '@storybook/testing-library'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import BubbleButton from './BubbleButton'

const meta: Meta<typeof BubbleButton> = {
    component: BubbleButton,
    args: {
        children: 'click me!'
    },
    parameters: {
        backgrounds: {
            values: [
                {
                    name: 'yeelow-gradient',
                    value: 'linear-gradient(30deg, #f39c12 30%, #f1c40f)'
                }
            ]
        }
    },
    decorators: [
        (Story) => {
            return <div>
                <Story />
            </div>
        }
    ]
}

export default meta
type Story = StoryObj<typeof BubbleButton>;

export const Primary: Story = {
    args: {}
}

export const Animating: Story = {
    play: async ({canvasElement}) => {
        // https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
        const canvas = within(canvasElement)
        const element = canvas.getByRole('button')
        userEvent.click(element)
        // userEvent vs fireEvent:
        // userEvent практически полная имитация  пользовательского взаимодействия
        // https://testing-library.com/docs/guide-events/
    }
}

export const Params: Story = {
    parameters: {
        backgrounds: {
            values: [
                {
                    name: 'yeelow-gradient',
                    value: 'linear-gradient(30deg, #f39c12 30%, #f1c40f)'
                },
                {
                    name: 'gray',
                    value: '#34495e'
                },
                {
                    name: 'darkgray',
                    value: '#2c3e50'
                }
            ]
        }
    }
}

export const AxiosPost200: Story = {
    args: {
        onClick: () => {
            console.log('fetch fake url')
            axios.post('fake-url').then(r => console.log(r))
        }
    },
    parameters: {
        axios: (mock: MockAdapter) => {
            mock.onPost('fake-url').reply(200, { test: 'some mock data' })
        }
    }
}
export const AxiosPost201: Story = {
    args: {
        onClick: () => {
            console.log('fetch fake url')
            axios.post('fake-url').then(r => console.log(r))
        }
    },
    parameters: {
        axios: (mock: MockAdapter) => {
            mock.onPost('fake-url').reply(201, { test: '' })
        }
    }
}

