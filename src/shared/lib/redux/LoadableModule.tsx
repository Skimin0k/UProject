import React, {FC, ReactNode, useEffect} from 'react'
import {useDispatch, useStore} from 'react-redux'
import {Reducer} from '@reduxjs/toolkit'
import {ReduxStoreWithManager, StateSchemaKey} from 'app/StoreProvider/config/StateSchema'

interface LoadableModuleProps {
    children: ReactNode,
    name: StateSchemaKey,
    reducer: Reducer,
    saveAfterUnmount?: boolean
}

const LoadableModule :FC<LoadableModuleProps> = (props) => {
    const {
        children,
        name, 
        reducer, 
        saveAfterUnmount = false
    } = props
    const dispatch = useDispatch()
    const store = useStore() as ReduxStoreWithManager
    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap()
        if(!mountedReducers[name]) {
            store.reducerManager.add(name, reducer)
            dispatch({type: `@INIT ${name} storage`})
        }
        return () => {
            if(mountedReducers[name] && !saveAfterUnmount) {
                store.reducerManager.remove(name)
                dispatch({type: `@DESTROY ${name} storage`})
            }
        }
    }, [dispatch, name, reducer, saveAfterUnmount, store.reducerManager])
    
    return <>{children}</>
}

export default LoadableModule