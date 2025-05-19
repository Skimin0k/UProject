import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {auctionDetailsReducerName} from '../slice/AuctionsSlice'
import {getAuctionContract} from '../slice/AuctionsSlice'

export interface ICreateLotProps {
    lotAddress: string,
}

export const removeLot = createAsyncThunk<void, ICreateLotProps, ThunkApi<string>>(
    `${auctionDetailsReducerName}/removeLot`,
    async (props, thunkApi) => {
        const {
            lotAddress,
        } = props
        const {
            rejectWithValue,
            getState,
        } = thunkApi
        try {
            const auctionContract = getAuctionContract(lotAddress)(getState())
            if(!auctionContract) {
                return
            }
            auctionContract.removeLot(lotAddress)
        } catch (e) {
            return rejectWithValue('Somethings goes wrong when fetched auction by address')
        }
    })