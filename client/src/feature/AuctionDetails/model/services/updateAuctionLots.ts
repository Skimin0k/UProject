import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {Auction} from 'entities/Auction/api/Auction'

import {auctionDetailsReducerName, IAuctionStateSchema} from '../slice/AuctionsSlice'

export const updateAuctionLots = createAsyncThunk<Required<IAuctionStateSchema['lots']>, Auction, ThunkApi<string>>(
    `${auctionDetailsReducerName}/updateAuctionLots`,
    async (auctionContract, thunkApi) => {
        const {
            rejectWithValue
        } = thunkApi
        try {
            return await auctionContract.getLots()
        } catch (e) {
            return rejectWithValue('Somethings goes wrong when fetched lots addresses')
        }
    })