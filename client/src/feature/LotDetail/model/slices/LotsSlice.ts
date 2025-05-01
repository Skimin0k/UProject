import {
    createEntityAdapter, createSelector,
    createSlice, EntityState
} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'

import {ILotData, Lot} from '../../../../entities/Lot'
import {fetchLotByAddress} from '../services/fetchLotByAddress'
import {updateLotData} from '../services/updateLotData'

export interface ILotStateSchema {
    address: string
    contract?: Lot,
    data?: ILotData,
    isLoading: boolean
    error?: string
}

export type ILotStateSliceSchema = EntityState<ILotStateSchema>

const lotsAdapter = createEntityAdapter<ILotStateSchema>({
    selectId: lot => lot.address,
})
const initialState = lotsAdapter.getInitialState<ILotStateSliceSchema>({
    ids: [],
    entities: {}
})

const LotsSlice = createSlice({
    name: 'lots',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLotByAddress.pending, (state, action) => {
                lotsAdapter.upsertOne(state as unknown as EntityState<ILotStateSchema>, {
                    address: action.meta.arg,
                    isLoading: true,
                })
            })
            .addCase(fetchLotByAddress.fulfilled, (state, action) => {
                const {contract, data} = action.payload
                lotsAdapter.updateOne(state as unknown as EntityState<ILotStateSchema>, {
                    id: action.meta.arg,
                    changes: {
                        contract,
                        data,
                        isLoading: false,
                        error: undefined,
                    },
                })
            })
            .addCase(fetchLotByAddress.rejected, (state, action) => {
                lotsAdapter.updateOne(state as unknown as EntityState<ILotStateSchema>, {
                    id: action.meta.arg,
                    changes: {
                        isLoading: false,
                        error: action.payload as string,
                    },
                })
            })

        builder
            .addCase(updateLotData.pending, (state, action) => {
                const contract = action.meta.arg
                lotsAdapter.upsertOne(state as unknown as EntityState<ILotStateSchema>, {
                    address: contract.address,
                    isLoading: true,
                })
            })
            .addCase(updateLotData.fulfilled, (state, action) => {
                const contract = action.meta.arg
                lotsAdapter.updateOne(state as unknown as EntityState<ILotStateSchema>, {
                    id: contract.address,
                    changes: {
                        data: action.payload,
                        isLoading: false,
                        error: undefined,
                    },
                })
            })
            .addCase(updateLotData.rejected, (state, action) => {
                const contract = action.meta.arg
                lotsAdapter.updateOne(state as unknown as EntityState<ILotStateSchema>, {
                    id: contract.address,
                    changes: {
                        isLoading: false,
                        error: action.payload as string,
                    },
                })
            })

    },
})

const getLotsState = (state: StateSchema) => state?.[lotDetailsReducerName] || lotsAdapter.getInitialState()
const lotSelectors = lotsAdapter.getSelectors()

export const getLot = (lotAddress: string) =>  createSelector(getLotsState, (state) => lotSelectors.selectById(state, lotAddress))
export const getLotContract = (auctionAddress: string) =>  createSelector(getLotsState, (state) => lotSelectors.selectById(state, auctionAddress)?.contract)
export const getLotData = (auctionAddress: string) =>  createSelector(getLotsState, (state) => lotSelectors.selectById(state, auctionAddress)?.data)
export const getLotIsLoading = (auctionAddress: string) =>  createSelector(getLotsState, (state) => lotSelectors.selectById(state, auctionAddress)?.isLoading)
export const getAuctionError = (auctionAddress: string) =>  createSelector(getLotsState, (state) => lotSelectors.selectById(state, auctionAddress)?.error)

export const {
    reducer: lotDetailsReducer,
    name: lotDetailsReducerName,
    actions: lotDetailsActions
} = LotsSlice
