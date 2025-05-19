import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {ipfsClient} from 'shared/lib/utils/ipfs/ipfsClient'

import {auctionDetailsReducerName} from '../slice/AuctionsSlice'
import {getAuctionContract} from '../slice/AuctionsSlice'

export interface ICreateLotProps {
    auctionAddress: string,
    eth_step: string,
    eth_price: string,
    initialData: object
}

export const createLot = createAsyncThunk<void, ICreateLotProps, ThunkApi<string>>(
    `${auctionDetailsReducerName}/createLot`,
    async (props, thunkApi) => {
        const {
            auctionAddress,
            initialData,
            eth_step,
            eth_price,
        } = props
        const {
            rejectWithValue,
            getState,
        } = thunkApi
        try {
            const auctionContract = getAuctionContract(auctionAddress)(getState())
            if(!auctionContract) {
                return
            }

            const resultData = {
                title: initialData.title,
                temperature: initialData.temperature
            }

            if(initialData.imgFile) {
                const addedImage = await ipfsClient.add(initialData.imgFile, { pin: true })
                const imageCID = addedImage.path
                resultData.image = `ipfs://${imageCID}`
            }

            console.log(resultData)
            auctionContract.createLot(eth_step, eth_price, resultData).catch(error => {})
        } catch (e) {
            return rejectWithValue('Somethings goes wrong when fetched auction by address')
        }
    })