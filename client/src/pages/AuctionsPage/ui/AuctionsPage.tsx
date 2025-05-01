import React from 'react'
import {useTranslation} from 'react-i18next'

const AuctionsPage = () => {
    const {t} = useTranslation('Auctions_Page')
    return (
        <div>
            {t('Auctions Page')}
        </div>
    )
}

export default AuctionsPage