import {useCallback, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import {getEthereumSigner, updateSigner} from 'entities/Ethereum'
import {routePaths, Routes} from 'shared/config/routeConfig/routerConfig'
import Button from 'shared/ui/Button/Button'
import Text from 'shared/ui/Text/Text'
import {PageWrapper} from 'widgets/Page'

import styles from './AuthPage.module.scss'

export const AuthPage = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const signer = useSelector(getEthereumSigner)

    useEffect(() => {
        if(signer && navigate) {
            navigate(routePaths[Routes.MAIN])
        }
    }, [signer, navigate])

    const onAuthButtonClick = useCallback(() => {
        dispatch(updateSigner(navigate))
    }, [navigate, dispatch])

    return(<PageWrapper className={styles.ArticlePage}>
        <Button onClick={onAuthButtonClick}>
            <Text text={t('Подключить кошелек Metamask')}/>
        </Button>
    </PageWrapper>)
}