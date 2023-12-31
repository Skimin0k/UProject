import {ReactNode} from 'react'
import {StoreProvider} from 'app/StoreProvider'
import {StateSchema} from 'app/StoreProvider'

export const withRedux = (component: ReactNode, options?: {initialState: StateSchema}) => {
    return <StoreProvider initialState={options?.initialState}>
        {component}
    </StoreProvider>
}