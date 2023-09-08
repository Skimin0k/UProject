import type {Meta, StoryObj} from '@storybook/react'
import {Currency} from 'entities/Currency'
import {Theme} from 'shared/theme/lib/ThemeContext'

import ProfileCard from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
    component: ProfileCard
}

export default meta
type Story = StoryObj<typeof ProfileCard>;

export const PlaceHolders: Story = {
    args: {

    }
}
export const Fulled: Story = {
    args: {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-ZUpmOHdSnkdx5rZy1TwYWWnGVnUq9WTZM8Fr1YfbbAP5wFao8s02pDf2vUL2yAxyFc&usqp=CAU',
        firstname: 'Jack',
        lastname: 'The Sparrow',
        age: 30,
        currency: Currency.USD,
        isLoading: false,
        error: '',
        readOnly: false
    }
}
export const ReadOnly: Story = {
    args: {
        ...Fulled.args,
        readOnly: true
    }
}
export const FulledDark: Story = {
    args: {
        ...Fulled.args
    },
    parameters: {
        component_theme: Theme.dark
    }
}
export const ReadOnlyDark: Story = {
    args: {
        ...ReadOnly.args
    },
    parameters: {
        component_theme: Theme.dark
    }
}
