import React from 'react'
import {useTranslation} from 'react-i18next'

const AuctionPage = () => {
    const {t} = useTranslation('AuctionPage')
    return (
        <div>
            {
                t('Auction Page')
            }
        </div>
    )
}

export default AuctionPage