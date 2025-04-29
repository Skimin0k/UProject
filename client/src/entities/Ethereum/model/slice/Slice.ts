import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createSelector} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import type {BrowserProvider, Signer} from 'ethers'

import {updateSigner} from '../service/updateSigner'

export interface IEthereumSliceStateSchema {
    signer?: Signer,
    provider?: BrowserProvider,
    isLoading: boolean,
    error?: string
}

const initialState: IEthereumSliceStateSchema = {
    isLoading: false,
}

const EthereumSlice = createSlice({
    name: 'ethereum',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<IEthereumSliceStateSchema['error']>) => {
            state.error = action.payload
        },
        setProvider: (state, action: PayloadAction<IEthereumSliceStateSchema['provider']>) => {
            state.provider = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(updateSigner.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(updateSigner.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(updateSigner.fulfilled, (state, action) => {
            state.signer = action.payload
            state.isLoading = false
        })
    }
})

const getEthereum = (state: StateSchema) => state?.[ethereumReducerName]
export const getEthereumError = createSelector(getEthereum, (state) => state?.error)
export const getEthereumProvider = createSelector(getEthereum,(state) => state?.provider )
export const getEthereumSigner = createSelector(getEthereum,(state) => state?.signer)

export const {
    reducer: ethereumReducer,
    name: ethereumReducerName,
    actions: ethereumActions
} = EthereumSlice
