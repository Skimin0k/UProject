import AuctionApi from 'artifacts/contracts/Auction.sol/Auction.json'
import {Auction as IAuction} from 'artifacts/typechain/contracts/Auction'
import {Contract, ethers, Provider, Signer} from 'ethers'
import contractBytesToJson from 'shared/lib/utils/ethereum/contractBytesToJson'
import {contractEventSubscriberWrapper} from 'shared/lib/utils/ethereum/contractEventSubscriberWrapper'

import {AuctionEvents} from './const/auctionEvents'

export class Auction{
    private readonly contract: IAuction
    address: string

    constructor(address: string, providerOrSigner: Signer | Provider) {
        this.address = address
        this.contract = new Contract(address, AuctionApi.abi, providerOrSigner) as unknown as IAuction
    }

    async getLots() {
        return this.contract.getLots()
    }

    async getData() {
        const data = await this.contract.getAuctionData()
        return contractBytesToJson(data)
    }

    async createLot(eth_step: string, eth_price: string){
        return this.contract.createLot(ethers.parseEther(eth_step), ethers.parseEther(eth_price))
    }

    async removeLot(address: string){
        return this.contract.removeLot(address)
    }

    private subscribe(eventName: AuctionEvents, handler: (args: any[]) => void) {
        const subscribeWrapper = contractEventSubscriberWrapper(eventName, handler, this.contract as unknown as Contract)
        subscribeWrapper.subscribe()
        return subscribeWrapper
    }

    subscribeLotsUpdated(handler: (args: any[]) => void) {
        return this.subscribe(AuctionEvents.LOTS_UPDATED, handler)
    }
}