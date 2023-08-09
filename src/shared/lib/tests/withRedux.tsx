import {ReactNode} from 'react'
import {StoreProvider} from 'app/StoreProvider'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'

export const withRedux = (component: ReactNode, options?: {initialState: StateSchema}) => {
    const {initialState} = options
    return <StoreProvider initialState={initialState}>
        {component}
    </StoreProvider>
}