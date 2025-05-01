import React from 'react'
import {useTranslation} from 'react-i18next'
import {AuctionConnector} from 'feature/AuctionDetails'
import Text from 'shared/ui/Text/Text'

const AuctionPage = () => {
    const {t} = useTranslation('AuctionPage')
    return (
        <div>
            <Text text={t('AuctionPage')}/>
            <AuctionConnector
                auctionAddress={'0x6B0B0Ccb0aD7ce8D5CDA21c0AecD7e55e8cC64c7'}
                auctionRender={ () => <Text text={'Auction is loaded'}/>}
                auctionLoadingRender={ () => <Text text={'Auction is loading...'}/>}
            />
        </div>
    )
}

export default AuctionPage