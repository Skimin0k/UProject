import type {Meta, StoryObj} from '@storybook/react'

import {LotCard} from './LotCard'

const meta: Meta<typeof LotCard> = {
    component: LotCard
}

export default meta
type Story = StoryObj<typeof LotCard>;

export const Primary: Story = {
    args: {
        title: 'Хомяк',
        price: '0.1'
    }
}