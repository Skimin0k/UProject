import React from 'react'
import {useTranslation} from 'react-i18next'

const AuctionPage = () => {
    const {t} = useTranslation('AuctionPage')
    return (
        <div>
            {t('AuctionPage')}
        </div>
    )
}

export default AuctionPage