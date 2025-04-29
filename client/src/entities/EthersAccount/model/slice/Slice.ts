import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createSelector} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import {EIP6963ProviderDetail} from 'entities/EthersAccount/model/types/EIP6963Provider'

import {connectAccount} from '../service/connectAccount'
import {IAccount} from '../types/account'

export interface IEthersAccountSliceStateSchema {
    account?: IAccount,
    providers?: Array<EIP6963ProviderDetail>,
    isLoading: boolean,
    error?: string
}

const initialState: IEthersAccountSliceStateSchema = {
    isLoading: false,
}

const EthersAccountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<IEthersAccountSliceStateSchema['account']>) => {
            state.account = action.payload
        },
        setProviders: (state, action: PayloadAction<IEthersAccountSliceStateSchema['providers']>) => {
            state.providers = action.payload
        },
        addProvider: (state, action: PayloadAction<EIP6963ProviderDetail>) => {
            state.providers = (state.providers || []).concat([action.payload])
        },
        clearProviders: (state) => {
            state.providers = undefined
        }
    },
    extraReducers: builder => {
        builder.addCase(connectAccount.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(connectAccount.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(connectAccount.fulfilled, (state, action) => {
            state.account = action.payload
            state.isLoading = false
        })
    }
})

const getEthersAccount = (state: StateSchema) => state?.[accountReducerName]
export const getAccountPublicName = createSelector(getEthersAccount, (state) => state?.account?.id)
export const getAccountError = createSelector(getEthersAccount, (state) => state?.error)
export const getAccountIsLoading = createSelector(getEthersAccount, (state) => state?.isLoading)
export const getAllProviders = createSelector(getEthersAccount, (state) => state?.providers)
export const getProvider = createSelector([getEthersAccount, (_, providerName: string) => providerName], (state, providerName) => state?.providers?.find(provider => provider.info.name === providerName))

export const {
    reducer: accountReducer,
    name: accountReducerName,
    actions: accountActions
} = EthersAccountSlice
