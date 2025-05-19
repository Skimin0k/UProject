import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {getLotContract} from '../slices/LotsSlice'
import {lotDetailsReducerName} from '../slices/LotsSlice'

export const raiseHand = createAsyncThunk<void, string, ThunkApi<string>>(
    `${lotDetailsReducerName}/raiseHand`,
    async (lotAddress, thunkApi) => {
        const {
            rejectWithValue,
            getState,
        } = thunkApi
        try {
            const lotContract = getLotContract(lotAddress)(getState())
            if(!lotContract) {
                return
            }
            lotContract.raiseHand()
        } catch (e) {
            return rejectWithValue('Somethings goes wrong when fetched auction by address')
        }
    })