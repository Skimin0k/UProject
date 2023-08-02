import React from 'react'
import {useTranslation} from 'react-i18next'
import ParentComponent from 'examples/react/ParentComponent/ParentComponent'


const MainPage = () => {
    const {t} = useTranslation('MainPage')
    return (
        <div>
            <div>
                {t('main')}
                <ParentComponent/>
            </div>
        </div>
    )
}

export default MainPage