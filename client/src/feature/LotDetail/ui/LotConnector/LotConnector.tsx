import React, {FC, memo, ReactNode, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import LoadableModule from 'shared/lib/redux/LoadableModule'

import {fetchLotByAddress} from '../../model/services/fetchLotByAddress'
import {updateLotData} from '../../model/services/updateLotData'
import {
    getLotContract,
    getLotIsLoading,
    lotDetailsReducer,
    lotDetailsReducerName} from '../../model/slices/LotsSlice'

const asyncReducers = {
    [lotDetailsReducerName]: lotDetailsReducer
}

export interface ILotDetailProps {
    lotLoadingRender?: ReactNode,
    lotRender: ReactNode
    lotAddress: string
}

const AuctionConnectorWithoutMemo: FC<ILotDetailProps> = ({
    lotAddress,
    lotLoadingRender,
    lotRender
}) => {
    const dispatch = useAppDispatch()

    const isLotLoading = useSelector(getLotIsLoading(lotAddress))
    useEffect(() => {
        dispatch(fetchLotByAddress(lotAddress))
    }, [lotAddress, dispatch])

    const lotContract = useSelector(getLotContract(lotAddress))
    useEffect(() => {
        if(!lotContract) {
            return
        }
        const updateLotInfo = () => {
            dispatch(updateLotData(lotContract))
        }
        const roomUpdateWrapper = lotContract.subscribeRoomUpdated(updateLotInfo)
        const nftOwnerUpdateWrapper = lotContract.subscribeNftOwnerChanged(updateLotInfo)
        
        return () => {
            roomUpdateWrapper.unsubscribe()
            nftOwnerUpdateWrapper.unsubscribe()
        }
    }, [dispatch, lotContract, lotAddress])

    return (<LoadableModule reducers={asyncReducers}>
        {
            isLotLoading? lotLoadingRender : lotRender
        }
    </LoadableModule>
    )
}

export const LotConnector = memo(AuctionConnectorWithoutMemo)