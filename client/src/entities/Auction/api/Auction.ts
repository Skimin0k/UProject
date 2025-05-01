import * as AuctionApi from 'artifacts/contracts/Auction.sol/Auction.json'
import {Auction as IAuction} from 'artifacts/typechain/contracts/Auction'
import {Contract,Provider,Signer} from 'ethers'
import {contractEventSubscriberWrapper} from 'shared/lib/utils/ethereum/contractEventSubscriberWrapper'

import {AuctionEvents} from './const/auctionEvents'

export class Auction{
    private contract: IAuction

    constructor(address: string, providerOrSigner: Signer | Provider) {
        this.contract = new Contract(address, AuctionApi.abi, providerOrSigner) as unknown as IAuction
    }

    async getLots() {
        return this.contract.getLots()
    }

    async createLot(eth_step: string, eth_price: string){
        return this.contract.createLot(eth_step, eth_price)
    }

    async removeLot(address: string){
        return this.contract.removeLot(address)
    }

    subscribeLotsUpdated(handler: (args: any[]) => void) {
        const subscribeWrapper = contractEventSubscriberWrapper(AuctionEvents.LOTS_UPDATED, handler, this.contract as unknown as Contract)
        subscribeWrapper.subscribe()
        return subscribeWrapper
    }
}