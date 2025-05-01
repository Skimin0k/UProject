import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {Auction} from 'entities/Auction/api/Auction'
import {getEthereumProvider, getEthereumSigner} from 'entities/Ethereum'

import {auctionDetailsReducerName} from '../slice/AuctionSlice'

export const fetchAuctionByAddress = createAsyncThunk<Auction, string, ThunkApi<string>>(
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
            return new Auction(address, providerOrSigner)
        } catch (e) {
            return rejectWithValue('Somethings goes wrong when fetched auction by address')
        }
    })