import React, {FC, ReactNode, useEffect} from 'react'
import {useDispatch, useStore} from 'react-redux'
import {Reducer} from '@reduxjs/toolkit'
import {ReduxStoreWithManager, StateSchemaKey} from 'app/StoreProvider/config/StateSchema'

interface LoadableModuleProps {
    children: ReactNode,
    reducers: Partial<Record<StateSchemaKey, Reducer>>,
    saveAfterUnmount?: boolean
}

const LoadableModule :FC<LoadableModuleProps> = (props) => {
    const {
        children,
        reducers, 
        saveAfterUnmount = false
    } = props
    const dispatch = useDispatch()
    const store = useStore() as ReduxStoreWithManager
    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap()
        Object.entries(reducers).forEach(([name, reducer]) => {
            if(!mountedReducers[name as StateSchemaKey]) {
                store.reducerManager.add(name as StateSchemaKey, reducer)
                dispatch({type: `@INIT ${name} storage`})
            } 
        })
        
        return () => {
            if(!saveAfterUnmount) {
                const mountedReducers = store.reducerManager.getReducerMap()
                Object.entries(reducers).forEach(([name]) => {
                    if(mountedReducers[name as StateSchemaKey]) {
                        store.reducerManager.remove(name as StateSchemaKey)
                        dispatch({type: `@DESTROY ${name} storage`})
                    }
                })
            }
        }
    }, [dispatch, reducers, saveAfterUnmount, store.reducerManager])
    
    return <>{children}</>
}

export default LoadableModule