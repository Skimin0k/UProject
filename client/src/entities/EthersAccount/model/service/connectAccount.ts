import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {accountReducerName} from '../slice/Slice'
import {IAccount} from '../types/account'
import {EIP6963ProviderDetail} from '../types/EIP6963Provider'

export const connectAccount = createAsyncThunk<IAccount, EIP6963ProviderDetail, ThunkApi<string>>(
    `${accountReducerName}/connectAccount`,
    async (providerWithInfo, thunkApi) => {
        const {
            rejectWithValue
        } = thunkApi
        try {
            const accounts = await providerWithInfo.provider.request<Array<string>>({method:'eth_requestAccounts'})
            if(accounts.length > 0) {
                return {
                    id: accounts[0]
                }
            }
            return rejectWithValue('Not enough accounts found.')
        } catch (e) {
            return rejectWithValue('Something went wrong with getting accounts.')
        }
    })