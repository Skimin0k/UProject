import React, {FC, memo, ReactNode, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import LoadableModule from 'shared/lib/redux/LoadableModule'

import {fetchAuctionByAddress} from '../../model/services/fetchAuctionByAddress'
import {updateAuctionLots} from '../../model/services/updateAuctionLots'
import {
    auctionDetailsReducer,
    auctionDetailsReducerName,
    getAuctionContract,
    getAuctionIsLoading
} from '../../model/slice/AuctionsSlice'

const asyncReducers = {
    [auctionDetailsReducerName]: auctionDetailsReducer
}

export interface IAuctionDetailProps {
    auctionLoadingRender?: ReactNode,
    auctionRender: ReactNode
    auctionAddress: string
}

const AuctionConnectorWithoutMemo: FC<IAuctionDetailProps> = ({
    auctionAddress,
    auctionLoadingRender,
    auctionRender
}) => {
    const dispatch = useAppDispatch()

    const isAuctionLoading = useSelector(getAuctionIsLoading(auctionAddress))

    useEffect(() => {
        dispatch(fetchAuctionByAddress(auctionAddress))
    }, [auctionAddress, dispatch])

    const auctionContract = useSelector(getAuctionContract(auctionAddress))

    useEffect(() => {
        if(!auctionContract) {
            return
        }
        const lotsUpdateWrapper = auctionContract.subscribeLotsUpdated(() => {
            dispatch(updateAuctionLots(auctionContract))
        })
        return () => {
            lotsUpdateWrapper.unsubscribe()
        }
    }, [dispatch, auctionContract])

    return (<LoadableModule reducers={asyncReducers}>
        {
            isAuctionLoading? auctionLoadingRender : auctionRender
        }
    </LoadableModule>
    )
}

export const AuctionConnector = memo(AuctionConnectorWithoutMemo)