import React, {FC, memo, ReactNode, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {getEthereumBlockNumber} from 'entities/Ethereum/model/slice/Slice'
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
    const blockNumber = useSelector(getEthereumBlockNumber)

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

    useEffect(() => {
        if(!auctionContract) {
            return
        }
    }, [dispatch, auctionContract, blockNumber])

    return (<LoadableModule reducers={asyncReducers} saveAfterUnmount={true}>
        {
            isAuctionLoading && !auctionContract? auctionLoadingRender : auctionRender
        }
    </LoadableModule>
    )
}

export const AuctionConnector = memo(AuctionConnectorWithoutMemo)