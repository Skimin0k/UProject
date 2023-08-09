import React, {FC, ReactNode, useEffect} from 'react'
import {useDispatch, useStore} from 'react-redux'
import {Reducer} from '@reduxjs/toolkit'
import {ReduxStoreWithManager, StateSchemaKey} from 'app/StoreProvider/config/StateSchema'

interface LoadableModuleProps {
    children: ReactNode,
    name: StateSchemaKey,
    reducer: Reducer
}

const LoadableModule :FC<LoadableModuleProps> = (props) => {
    const {children,name, reducer} = props
    const dispatch = useDispatch()
    const store = useStore() as ReduxStoreWithManager
    
    useEffect(() => {
        store.reducerManager.add(name, reducer)
        dispatch({type: `@INIT ${name} storage`})
        return () => {
            store.reducerManager.remove(name)
            dispatch({type: `@DESTROY ${name} storage`})
        }
    }, [dispatch, name, reducer, store.reducerManager])
    
    return <>{children}</>
}

export default LoadableModule