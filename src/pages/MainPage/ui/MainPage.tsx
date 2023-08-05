import React, { useState } from 'react'
import {useTranslation} from 'react-i18next'
import {Counter} from 'entities/Counter'
import Modal from 'shared/ui/Modal/Modal'

const MainPage = () => {
    const {t} = useTranslation('MainPage')

    const [w, sw] = useState(false)
    return (
        <div>
            <div>
                {t('main')}
                {/*<ParentComponent/>*/}
                <button onClick={() => {
                    sw(true)
                    console.log('clicked')}
                    // eslint-disable-next-line i18next/no-literal-string
                }>click me</button>
                <Modal
                    isOpen={w}
                    onClickOutside={() => {
                        sw(false)
                    }}

                />
                <Counter/>
            </div>
        </div>
    )
}

export default MainPage