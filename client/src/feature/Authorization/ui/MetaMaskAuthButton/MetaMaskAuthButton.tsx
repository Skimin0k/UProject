import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {StateSchema, useAppDispatch} from 'app/StoreProvider'
import {connectAccount,getProvider} from 'entities/EthersAccount'
import BubbleButton from 'shared/ui/BubbleButton/BubbleButton'
import Text from 'shared/ui/Text/Text'

const metaMaskSelector = (state: StateSchema) => getProvider(state, 'MetaMask')

export const MetaMaskAuthButton= memo(() => {
    const provider = useSelector(metaMaskSelector)
    const dispatch = useAppDispatch()
    const {t}  = useTranslation()
    const onClick = useCallback(() => {
        if(provider) {
            dispatch(connectAccount(provider))
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