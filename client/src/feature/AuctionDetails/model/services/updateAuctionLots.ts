import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {auctionDetailsReducerName,getAuction, IAuctionDetailsSliceStateSchema} from '../slice/AuctionSlice'

export const updateAuctionLots = createAsyncThunk<Required<IAuctionDetailsSliceStateSchema['lots']>, void, ThunkApi<string>>(
    `${auctionDetailsReducerName}/updateAuctionLots`,
    async (_, thunkApi) => {
        const {
            rejectWithValue,
            getState
        } = thunkApi
        try {
            const auction = getAuction(getState())
            if(!auction) {
                return rejectWithValue('There is no auction')
            }
            return await auction.getLots()
        } catch (e) {
            return rejectWithValue('Somethings goes wrong when fetched lots addresses')
        }
    })