import {FC, ReactNode} from 'react'
import {Provider} from 'react-redux'
import {DeepPartial, ReducersMapObject} from '@reduxjs/toolkit'

import {StateSchema} from '../config/StateSchema'
import {configureReduxStore} from '../config/store'

interface StoreProviderProps {
    children: ReactNode,
    initialState?: StateSchema,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}
export const StoreProvider: FC<StoreProviderProps> = ({children, initialState, asyncReducers}) => {
    return <Provider store={configureReduxStore(initialState, asyncReducers as ReducersMapObject<StateSchema>)}>
        {children}
    </Provider>
}