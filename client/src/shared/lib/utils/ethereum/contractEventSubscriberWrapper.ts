import {Contract} from 'ethers'

export interface ContractEventSubscriberWrapper<TContract extends Contract> {
    unsubscribe: () => Promise<TContract>,
    subscribe: () => Promise<TContract>,
}

export function contractEventSubscriberWrapper<TContract extends Contract>(eventName: string, handler: (args: any[]) => void, contract: TContract) {
    return {
        subscribe: () => {
            return contract.on(eventName, handler)
        },
        unsubscribe: () => {
            return contract.off(eventName, handler)
        }
    }
}