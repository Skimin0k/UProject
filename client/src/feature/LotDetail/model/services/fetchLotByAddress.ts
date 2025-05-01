import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {getEthereumProvider, getEthereumSigner} from 'entities/Ethereum'
import {ILotData} from 'entities/Lot'
import {Lot} from 'entities/Lot/api/Lot'

import {lotDetailsReducerName} from '../slices/LotsSlice'

export interface IFetchLotByAddressReturnArgs {
    contract: Lot,
    data: ILotData
}

export const fetchLotByAddress = createAsyncThunk<IFetchLotByAddressReturnArgs, string, ThunkApi<string>>(
    `${lotDetailsReducerName}/fetchLotByAddress`,
    async (address, thunkApi) => {
        const {
            rejectWithValue,
            getState,
        } = thunkApi
        try {
            const providerOrSigner = getEthereumSigner(getState()) || getEthereumProvider(getState())
            if(!providerOrSigner) {
                return rejectWithValue('There is no provider and Signer')
            }
            const contract = new Lot(address, providerOrSigner)
            const data = await contract.getInfo()
            return {contract, data}
        } catch (e) {
            return rejectWithValue('Somethings goes wrong when fetched auction by address')
        }
    })