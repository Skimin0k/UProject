import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import type {BrowserProvider, Signer} from 'ethers'

import {ethereumReducerName} from '../slice/Slice'

export const updateSigner = createAsyncThunk<Signer, BrowserProvider, ThunkApi<string>>(
    `${ethereumReducerName}/updateSigner`,
    async (provider, thunkApi) => {
        const {
            rejectWithValue,
        } = thunkApi
        try {
            await provider.send('eth_requestAccounts', [])
            return await provider.getSigner()
        } catch (e) {
            return rejectWithValue('Something went wrong with getting accounts.')
        }
    })