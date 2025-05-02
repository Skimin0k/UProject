import {
    createEntityAdapter, createSelector,
    createSlice, EntityState
} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'
import { Auction } from 'entities/Auction'

import { fetchAuctionByAddress } from '../services/fetchAuctionByAddress'
import { updateAuctionLots } from '../services/updateAuctionLots'

export interface IAuctionStateSchema {
    address: string
    contract?: Auction
    data?: object,
    lots?: string[]
    isLoading: boolean
    isLotsLoading: boolean
    error?: string
}

export type IAuctionStateSliceSchema = EntityState<IAuctionStateSchema>

const auctionsAdapter = createEntityAdapter<IAuctionStateSchema>({
    selectId: auction => auction.address,
})
const initialState = auctionsAdapter.getInitialState<IAuctionStateSliceSchema>({
    ids: [],
    entities: {}
})

const AuctionsSlice = createSlice({
    name: 'auctions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAuctionByAddress.pending, (state, action) => {
                auctionsAdapter.upsertOne(state as unknown as EntityState<IAuctionStateSchema>, {
                    address: action.meta.arg,
                    isLoading: true,
                    isLotsLoading: false,
                })
            })
            .addCase(fetchAuctionByAddress.fulfilled, (state, action) => {
                const {contract, data, lots} = action.payload
                auctionsAdapter.updateOne(state as unknown as EntityState<IAuctionStateSchema>, {
                    id: action.meta.arg,
                    changes: {
                        contract,
                        lots,
                        data,
                        isLotsLoading: false,
                        isLoading: false,
                        error: undefined,
                    },
                })
            })
            .addCase(fetchAuctionByAddress.rejected, (state, action) => {
                auctionsAdapter.updateOne(state as unknown as EntityState<IAuctionStateSchema>, {
                    id: action.meta.arg,
                    changes: {
                        isLotsLoading: false,
                        isLoading: false,
                        error: action.payload as string,
                    },
                })
            })

        builder
            .addCase(updateAuctionLots.pending, (state, action) => {
                const address = action.meta.arg.address
                if(state.ids.includes(address)) {
                    auctionsAdapter.updateOne(state as unknown as EntityState<IAuctionStateSchema>, {
                        id: address,
                        changes: {
                            isLotsLoading: true,
                        },
                    })
                }
            })
            .addCase(updateAuctionLots.fulfilled, (state, action) => {
                const address = action.meta.arg.address
                if(state.ids.includes(address)) {
                    auctionsAdapter.updateOne(state as unknown as EntityState<IAuctionStateSchema>, {
                        id: address,
                        changes: {
                            lots: action.payload,
                            isLotsLoading: false,
                            error: undefined,
                        },
                    })
                }
            })
            .addCase(updateAuctionLots.rejected, (state, action) => {
                const address = action.meta.arg.address
                if(state.ids.includes(address)) {
                    auctionsAdapter.updateOne(state as unknown as EntityState<IAuctionStateSchema>, {
                        id: address,
                        changes: {
                            isLotsLoading: false,
                            isLoading: false,
                            error: action.payload as string,
                        },
                    })
                }
            })

    },
})

const getAuctionsState = (state: StateSchema) => state?.[auctionDetailsReducerName] || auctionsAdapter.getInitialState()
const auctionSelectors = auctionsAdapter.getSelectors()

export const getAuction = (auctionAddress: string) =>  createSelector(getAuctionsState, (state) => auctionSelectors.selectById(state, auctionAddress))
export const getAuctionContract = (auctionAddress: string) =>  createSelector(getAuctionsState, (state) => auctionSelectors.selectById(state, auctionAddress)?.contract)
export const getAuctionIsLoading = (auctionAddress: string) =>  createSelector(getAuctionsState, (state) => auctionSelectors.selectById(state, auctionAddress)?.isLoading)
export const getAuctionError = (auctionAddress: string) =>  createSelector(getAuctionsState, (state) => auctionSelectors.selectById(state, auctionAddress)?.error)
export const getAuctionLotsList = (auctionAddress: string) =>  createSelector(getAuctionsState, (state) => auctionSelectors.selectById(state, auctionAddress)?.lots)
export const getAuctionData = (auctionAddress: string) =>  createSelector(getAuctionsState, (state) => auctionSelectors.selectById(state, auctionAddress)?.data)
export const getAuctionLotsIsLoading = (auctionAddress: string) =>  createSelector(getAuctionsState, (state) => auctionSelectors.selectById(state, auctionAddress)?.isLotsLoading)

export const {
    reducer: auctionDetailsReducer,
    name: auctionDetailsReducerName,
    actions: auctionDetailsActions
} = AuctionsSlice
