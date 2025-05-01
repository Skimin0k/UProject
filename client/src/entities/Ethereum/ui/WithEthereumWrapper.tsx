import {FC, useEffect} from 'react'
import {ReactNode} from 'react'
import {useAppDispatch} from 'app/StoreProvider'
import {updateSigner} from 'entities/Ethereum'
import {BrowserProvider,Eip1193Provider} from 'ethers'

import {ethereumActions} from '../model/slice/Slice'

declare global {
    interface Window {
        ethereum?: Eip1193Provider & {
            on: (eventName: string, handler: (...args: any[]) => void) => void;
            removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
        };
    }
}

interface IProviderStoreProps {
    children: ReactNode
}

export const WithEthereumWrapper: FC<IProviderStoreProps> = (props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const updateSignerState = () => {
            dispatch(updateSigner())
        }
        const ethereum = window.ethereum
        if(ethereum) {
            const provider = new BrowserProvider(ethereum)
            dispatch(ethereumActions.setProvider(provider))
            ethereum.on('accountsChanged', updateSignerState)
        } else {
            dispatch(ethereumActions.setError('Not Installed MetaMask Extension'))
        }
        return () => {
            const ethereum = window.ethereum
            if(ethereum) {
                ethereum.removeListener('accountsChanged', updateSignerState)
            }
        }
    }, [dispatch])

    return <>{props.children}</>
}