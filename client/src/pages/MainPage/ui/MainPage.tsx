import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {AuctionConnector, getAuctionContract, getAuctionData, getAuctionLotsList} from 'feature/AuctionDetails'
import {getLotData, LotConnector} from 'feature/LotDetail'
import Button from 'shared/ui/Button/Button'
import Text from 'shared/ui/Text/Text'
import {PageWrapper} from 'widgets/Page'

const LotRender = ({lotAddress}: {lotAddress: string}) => {
    const lotInfo = useSelector(getLotData(lotAddress))
    return <div>
        <Text text={'======== Lot: ' + lotAddress + ' ========'}/>
        {
            lotInfo && lotInfo.price
        }
        <Text text={'____________'}/>
        <Text text={''}/>
    </div>
}

const AuctionRender = ({auctionAddress}: {auctionAddress: string}) => {
    const auctionContract = useSelector(getAuctionContract(auctionAddress))
    const lotsList = useSelector(getAuctionLotsList(auctionAddress))
    const auctionData = useSelector(getAuctionData(auctionAddress))

    const onCreateLotButtonClick = useCallback(() => {
        if(!auctionContract) {
            return
        }
        auctionContract.createLot('0.1', '0.1')
    }, [auctionContract])

    return <div>
        <Text text={`Auction: ${auctionData?.title} has loaded. Address is` + auctionAddress}/>
        <Button onClick={onCreateLotButtonClick}><Text text="click to createLot" /> </Button>
        {
            lotsList && lotsList.map(lotAddress => {
                return <LotConnector
                    key={lotAddress}
                    lotAddress={lotAddress}
                    lotRender={<LotRender lotAddress={lotAddress}/>}
                />
            })
        }
    </div>
}

const MainPage = () => {
    const {t} = useTranslation()

    return (
        <PageWrapper>
            <div>
                <Text text={t('AuctionPage')}/>
                <AuctionConnector
                    auctionAddress={'0xE5225277B05545192a07C4190a411150A917a235'}
                    auctionRender={<AuctionRender
                        auctionAddress={'0xE5225277B05545192a07C4190a411150A917a235'}
                    />}
                />

            </div>
        </PageWrapper>
    )
}

export default MainPage