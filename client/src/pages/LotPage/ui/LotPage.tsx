import React from 'react'
import {useTranslation} from 'react-i18next'

const LotPage = () => {
    const {t} = useTranslation('LotPage')
    return (
        <div>
            {t('LotPage')}
        </div>
    )
}

export default LotPage