import React from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {getAccountError, getAccountIsLoading,getAccountPublicName} from 'entities/EthersAccount'
import {MetaMaskAuthButton} from 'feature/Authorization'
import Text from 'shared/ui/Text/Text'
import {PageWrapper} from 'widgets/Page'

import styles from 'pages/Article/ui/ArticlePage.module.scss'

const MainPage = () => {
    const {t}= useTranslation()
    const accountId = useSelector(getAccountPublicName)
    const accountIsLoading = useSelector(getAccountIsLoading)
    const accountError = useSelector(getAccountError)

    return (
        <PageWrapper className={styles.ArticlePage}>
            <div>
                <MetaMaskAuthButton/>
                <Text text={t('WALLET INFO: ') + (accountId ?? '')}/>
                {accountIsLoading && <Text text={t('wallet is getting')}/>}
                {accountError && <Text text={`account Error: ${accountError}`}/>}
            </div>
        </PageWrapper>
    )
}

export default MainPage