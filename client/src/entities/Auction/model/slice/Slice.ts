import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createSelector} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import {Auction as IAuction} from 'artifacts/typechain/contracts/Auction'

export interface IAuctionSliceStateSchema {
    auction?: IAuction,
    isLoading: boolean,
    error?: string
}

const initialState: IAuctionSliceStateSchema = {
    isLoading: false,
}

const AuctionSlice = createSlice({
    name: 'auctionContract',
    initialState,
    reducers: {
        setAuction: (state, action: PayloadAction<IAuctionSliceStateSchema['auction']>) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.auction = action.payload as IAuction
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    extraReducers: builder => {
    }
})

const getAuction = (state: StateSchema) => state?.[auctionReducerName]
export const getAuctionContract = createSelector(getAuction, (state) => state?.error)

export const {
    reducer: auctionReducer,
    name: auctionReducerName,
    actions: auctionActions
} = AuctionSlice
