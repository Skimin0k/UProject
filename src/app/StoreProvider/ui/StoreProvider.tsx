import {FC, ReactNode} from 'react'
import {Provider} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {DeepPartial, ReducersMapObject} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider/config/StateSchema'
import {configureReduxStore} from 'app/StoreProvider/config/store'

interface StoreProviderProps {
    children: ReactNode,
    initialState?: StateSchema,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}
export const StoreProvider: FC<StoreProviderProps> = ({children, initialState, asyncReducers}) => {
    const navigate = useNavigate()
    return <Provider store={configureReduxStore(initialState, asyncReducers as ReducersMapObject<StateSchema>, navigate)}>
        {children}
    </Provider>
}