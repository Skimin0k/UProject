import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {getEthereumProvider, updateSigner} from 'entities/Ethereum'
import BubbleButton from 'shared/ui/BubbleButton/BubbleButton'
import Text from 'shared/ui/Text/Text'

export const MetaMaskAuthButton= memo(() => {
    const provider = useSelector(getEthereumProvider)
    const dispatch = useAppDispatch()
    const {t}  = useTranslation()
    const onClick = useCallback(() => {
        if(provider) {
            dispatch(updateSigner(provider))
        }
    }, [dispatch, provider])

    return (
        provider
            ? <BubbleButton onClick={onClick}>
                <Text text={t('Подключить кошешел MetaMask')}/>
            </BubbleButton>
            : <Text text={t('Говнище')}/>

    )
})
