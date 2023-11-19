import React, { useState } from 'react'
import {useTranslation} from 'react-i18next'
import {ModalLoginForm} from 'feature/Authorization'
import {PageWrapper} from 'widgets/Page'

import styles from 'pages/Article/ui/ArticlePage.module.scss'

const MainPage = () => {
    const {t} = useTranslation('MainPage')

    const [w, sw] = useState(false)

    return (
        <PageWrapper className={styles.ArticlePage}>
            <button onClick={() => {
                sw(true)
                console.log('clicked')}
                // eslint-disable-next-line i18next/no-literal-string
            }>{t('войти в аккаунт')}</button>
            <ModalLoginForm
                isOpen={w}
                onClickOutside={() => {
                    sw(false)
                }}
            />
        </PageWrapper>
    )
}

export default MainPage