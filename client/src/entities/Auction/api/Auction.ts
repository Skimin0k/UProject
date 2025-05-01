import * as AuctionApi from 'artifacts/contracts/Auction.sol/Auction.json'
import {Auction as IAuction} from 'artifacts/typechain/contracts/Auction'
import {Contract,Provider,Signer} from 'ethers'

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
}