import type {FC} from 'react'
import {ReactNode, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {accountActions,getAllProviders} from '../model/slice/Slice'
import type {EIP6963AnnounceProviderEvent} from '../model/types/EIP6963Provider'

declare global {
    interface WindowEventMap {
        'eip6963:announceProvider': CustomEvent
    }
}

interface IProviderStoreProps {
    children: ReactNode
}

export const ProviderStore: FC<IProviderStoreProps> = (props) => {
    const dispatch = useDispatch()
    const providers = useSelector(getAllProviders)

    const onAnnouncement = useCallback((event: EIP6963AnnounceProviderEvent) => {
        if(providers && providers.map(p => p.info.uuid).includes(event.detail.info.uuid)) {
            return
        }
        dispatch(accountActions.addProvider(event.detail))
    }, [dispatch, providers])

    useEffect(() => {
        window.addEventListener('eip6963:announceProvider', onAnnouncement)
        window.dispatchEvent(new Event('eip6963:requestProvider'))
        
        return () => {
            window.removeEventListener('eip6963:announceProvider', onAnnouncement)
        }
    }, [onAnnouncement])
    return <>{props.children}</>
}