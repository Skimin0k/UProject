import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createSelector} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import {Auction} from 'entities/Auction'
import {fetchAuctionByAddress} from 'feature/AuctionDetails/model/services/fetchAuctionByAddress'
import {updateAuctionLots} from 'feature/AuctionDetails/model/services/updateAuctionLots'

export interface IAuctionDetailsSliceStateSchema {
    auction?: Auction,
    lots?: string[],
    isLoading: boolean,
    isLotsLoading: boolean,
    error?: string
}

const initialState: IAuctionDetailsSliceStateSchema = {
    isLoading: false,
    isLotsLoading: false,
}

const AuctionDetails = createSlice({
    name: 'auctionDetails',
    initialState,
    reducers: {
        setAuction: (state, action: PayloadAction<IAuctionDetailsSliceStateSchema['auction']>) => {
            state.auction = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAuctionByAddress.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchAuctionByAddress.fulfilled, (state, action) => {
            state.isLoading = false
            state.auction = action.payload
        })
        builder.addCase(fetchAuctionByAddress.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(updateAuctionLots.pending, (state) => {
            state.isLotsLoading = true
        })
        builder.addCase(updateAuctionLots.fulfilled, (state, action) => {
            state.isLotsLoading = false
            state.lots = action.payload
        })
        builder.addCase(updateAuctionLots.rejected, (state, action) => {
            state.isLotsLoading = false
            state.error = action.payload
        })

    }
})

const getAuctionDetails = (state: StateSchema) => state?.[auctionDetailsReducerName]
export const getAuction = createSelector(getAuctionDetails, (state) => state?.auction)
export const getAuctionIsLoading = createSelector(getAuctionDetails, (state) => state?.isLoading)
export const getAuctionError = createSelector(getAuctionDetails, (state) => state?.error)
export const getLotsList = createSelector(getAuctionDetails, (state) => state?.lots)
export const getLotsListIsLoading = createSelector(getAuctionDetails, (state) => state?.isLotsLoading)

export const {
    reducer: auctionDetailsReducer,
    name: auctionDetailsReducerName,
    actions: auctionDetailsActions
} = AuctionDetails
