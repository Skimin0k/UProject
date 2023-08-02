import type {Meta, StoryObj} from '@storybook/react'
import {userEvent, within} from '@storybook/testing-library'

import BubbleButton from './BubbleButton'

const meta: Meta<typeof BubbleButton> = {
    component: BubbleButton,
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

export const Parrams: Story = {
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

