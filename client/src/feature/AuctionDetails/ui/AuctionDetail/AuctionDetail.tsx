import React, {FC, memo, ReactNode, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import Text from 'shared/ui/Text/Text'

import {fetchAuctionByAddress} from '../../model/services/fetchAuctionByAddress'
import {updateAuctionLots} from '../../model/services/updateAuctionLots'
import {
    getAuction,
    getLotsList,
    getLotsListIsLoading,
    IAuctionDetailsSliceStateSchema
} from '../../model/slice/AuctionSlice'

export interface IAuctionDetailProps {
    lotsListRender: (isLoading: boolean, addresses: IAuctionDetailsSliceStateSchema['lots']) => ReactNode
    auctionAddress: string
}

const AuctionDetailWithoutMemo: FC<IAuctionDetailProps> = ({
    auctionAddress,
    lotsListRender,
}) => {
    const {t} = useTranslation('AuctionPage')
    const dispatch = useAppDispatch()
    const auctionContract = useSelector(getAuction)
    const lotsList = useSelector(getLotsList)
    const isLotsLoading = useSelector(getLotsListIsLoading)

    useEffect(() => {
        if(!auctionAddress) {
            return
        }
        dispatch(fetchAuctionByAddress(auctionAddress))

    }, [auctionAddress, dispatch])

    useEffect(() => {
        if(!auctionContract) {
            return
        }
        const lotsUpdateWrapper = auctionContract.subscribeLotsUpdated(() => {
            dispatch(updateAuctionLots())
        })
        return () => {
            lotsUpdateWrapper.unsubscribe()
        }
    }, [dispatch, auctionContract])

    return (
        <div>
            <Text text={t('Auction address is: ') + auctionAddress}/>
            {
                lotsList ?? lotsListRender(isLotsLoading, lotsList)
            }
        </div>
    )
}

export const AuctionDetail = memo(AuctionDetailWithoutMemo)