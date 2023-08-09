import {ReactNode} from 'react'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'

export const withRedux = (component: ReactNode, options?: {initialState: StateSchema}) => {
    const {initialState} = options
    return
}