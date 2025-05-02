import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {Auction} from 'entities/Auction/api/Auction'
import {getEthereumProvider, getEthereumSigner} from 'entities/Ethereum'

import {auctionDetailsReducerName} from '../slice/AuctionsSlice'

export interface IFetchAuctionByAddressReturnArgs {
    contract: Auction,
    data: object,
    lots: string[],
}

export const fetchAuctionByAddress = createAsyncThunk<IFetchAuctionByAddressReturnArgs, string, ThunkApi<string>>(
    `${auctionDetailsReducerName}/fetchAuctionByAddress`,
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
            const contract = new Auction(address, providerOrSigner)
            const lots = await contract.getLots()
            const data = await contract.getData()
            return {contract, data, lots }
        } catch (e) {
            console.log(e)
            return rejectWithValue('Somethings goes wrong when fetched auction by address')
        }
    })