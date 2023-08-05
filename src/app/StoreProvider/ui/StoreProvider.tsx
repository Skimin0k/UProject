import {FC, ReactNode} from 'react'
import {Provider} from 'react-redux'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'
import {configureReduxStore} from 'app/StoreProvider/config/store'

interface StoreProviderProps {
    children: ReactNode,
    initialState?: StateSchema
}
export const StoreProvider: FC<StoreProviderProps> = ({children, initialState}) => {
    return <Provider store={configureReduxStore(initialState)}>
        {children}
    </Provider>
}