import React from 'react'
import {useTranslation} from 'react-i18next'


const MainPage = () => {
    const {t} = useTranslation('MainPage')
    return (
        <div>
            <div>
                here we go
            </div>
            <div>
                {t('main')}
            </div>
        </div>
    )
}

export default MainPage