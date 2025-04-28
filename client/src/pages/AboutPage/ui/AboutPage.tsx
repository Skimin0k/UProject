import React from 'react'
import {useTranslation} from 'react-i18next'

const AboutPage = () => {
    const {t} = useTranslation('AboutPage')
    return (
        <div>
            {t('welcome text')}
        </div>
    )
}

export default AboutPage