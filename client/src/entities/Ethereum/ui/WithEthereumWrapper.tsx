import {FC, useEffect} from 'react'
import {ReactNode} from 'react'
import {useAppDispatch} from 'app/StoreProvider'
import {BrowserProvider,Eip1193Provider} from 'ethers'

import {ethereumActions} from '../model/slice/Slice'

declare global {
    interface Window {
        ethereum?: Eip1193Provider
    }
}

interface IProviderStoreProps {
    children: ReactNode
}

export const WithEthereumWrapper: FC<IProviderStoreProps> = (props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(window.ethereum) {
            const provider = new BrowserProvider(window.ethereum)
            dispatch(ethereumActions.setProvider(provider))
        } else {
            dispatch(ethereumActions.setError('Not Installed MetaMask Extension'))
        }
        
    }, [dispatch])

    return <>{props.children}</>
}