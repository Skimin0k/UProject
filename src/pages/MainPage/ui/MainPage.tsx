import React, { useState } from 'react'
import {useTranslation} from 'react-i18next'
import {Counter} from 'entities/Counter'
import {ModalLoginForm} from 'feature/Authorization'
import {PageWrapper} from 'widgets/Page'

import styles from 'pages/Article/ui/ArticlePage.module.scss'

const MainPage = () => {
    const {t} = useTranslation('MainPage')

    const [w, sw] = useState(false)
    return (
        <PageWrapper className={styles.ArticlePage}>
            {t('main')}
            <button onClick={() => {
                sw(true)
                console.log('clicked')}
                // eslint-disable-next-line i18next/no-literal-string
            }>click me</button>
            <ModalLoginForm
                isOpen={w}
                onClickOutside={() => {
                    sw(false)
                }}
            />
            <Counter/>
        </PageWrapper>
    )
}

export default MainPage