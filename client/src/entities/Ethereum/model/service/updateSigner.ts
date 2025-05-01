import {NavigateFunction} from 'react-router-dom'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import type { Signer} from 'ethers'
import {routePaths, Routes} from 'shared/config/routeConfig/routerConfig'

import {ethereumReducerName, getEthereumProvider} from '../slice/Slice'

export const updateSigner = createAsyncThunk<Signer, NavigateFunction | undefined, ThunkApi<string>>(
    `${ethereumReducerName}/updateSigner`,
    async (navigate, thunkApi) => {
        const {
            rejectWithValue,
            getState,
        } = thunkApi
        try {
            const provider = getEthereumProvider(getState())
            if(!provider) {
                return rejectWithValue('Provider not found.')
            }
            await provider.send('eth_requestAccounts', [])
            const signer = await provider.getSigner()
            if(navigate) {
                navigate(routePaths[Routes.AUTH])
            }
            return signer
        } catch (e) {
            return rejectWithValue('Something went wrong with getting accounts.')
        }
    })