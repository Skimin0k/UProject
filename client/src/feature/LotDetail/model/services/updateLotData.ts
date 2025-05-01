import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {getEthereumProvider, getEthereumSigner} from 'entities/Ethereum'
import {ILotData} from 'entities/Lot'
import {Lot} from 'entities/Lot/api/Lot'

import {lotDetailsReducerName} from '../slices/LotsSlice'

export const updateLotData = createAsyncThunk<ILotData, Lot, ThunkApi<string>>(
    `${lotDetailsReducerName}/updateLotData`,
    async (contract, thunkApi) => {
        const {
            rejectWithValue,
            getState,
        } = thunkApi
        try {
            const providerOrSigner = getEthereumSigner(getState()) || getEthereumProvider(getState())
            if(!providerOrSigner) {
                return rejectWithValue('There is no provider and Signer')
            }
            return contract.getInfo()
        } catch (e) {
            return rejectWithValue('Somethings goes wrong when fetched auction by address')
        }
    })