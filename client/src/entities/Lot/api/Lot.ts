import LotRoomApi from 'artifacts/contracts/LotRoom.sol/LotRoom.json'
import {LotRoom as ILot} from 'artifacts/typechain/contracts/LotRoom'
import {Contract, ethers, Provider, Signer} from 'ethers'
import contractBytesToJson from 'shared/lib/utils/ethereum/contractBytesToJson'
import {contractEventSubscriberWrapper} from 'shared/lib/utils/ethereum/contractEventSubscriberWrapper'

import {ILotData} from '../types/types'

import {LotEvents} from './const/lotEvents'

export class Lot {
    private contract: ILot
    public address: string
    private providerOrSigner: Signer | Provider

    constructor(address: string, providerOrSigner: Signer | Provider) {
        this.contract = new Contract(address, LotRoomApi.abi, providerOrSigner) as unknown as ILot
        this.address = address
        this.providerOrSigner = providerOrSigner
    }

    async raiseHand() {
        return this.contract.raiseHand({ value: ethers.parseEther('0.01') })
    }

    async downHand(){
        return this.contract.downHand()
    }

    async buy(){
        const [
            tokenID,
            initBlock,
            price,
            deposit,
        ] = await this.contract.info()
        let options = {}
        if(deposit < price) {
            options = {value: (price - deposit).toString()}
        }
        return this.contract.buy(options)
    }

    async getFinalPrice(){
        return this.contract.getPrice()
    }

    async getInfo(): Promise<ILotData> {
        const [
            tokenID,
            initBlock,
            price,
            deposit,
            ETH_step,
            waitingStatus,
            blockStep,
            countOfMembers,
            isWaiting,
            isMember,
            isNFTOwner,
            data
        ] = await this.contract.info()
        
        return {
            tokenID: tokenID.toString(),
            price: ethers.formatEther(price), //начальная цена лота в эфирах
            deposit: deposit.toString(), // сумма за принятие участия
            ETH_step: ethers.formatEther(ETH_step), // шаг роста price
            waitingStatus: waitingStatus.toString(), // сколько блоков длится ожидание
            blockStep: blockStep.toString(), // шаг повышения цены
            initBlock: initBlock.toString(), // текущий блок
            members: countOfMembers.toString(), // количество участников
            isWaiting,
            isNFTOwner,
            isMember,
            data: contractBytesToJson(data[data.length - 1])
        }

    }

    updateProvider(providerOrSigner: Signer | Provider) {
        this.contract.connect(providerOrSigner)
        this.providerOrSigner = providerOrSigner
    }

    subscribeRoomUpdated(handler: (args: any[]) => void) {
        return this.subscribe(LotEvents.ROOM_UPDATED, handler)
    }
    subscribeNftOwnerChanged(handler: (args: any[]) => void) {
        return this.subscribe(LotEvents.NFT_OWNER_UPDATED, handler)
    }

    private subscribe(eventName: LotEvents, handler: (args: any[]) => void) {
        const subscribeWrapper = contractEventSubscriberWrapper(eventName, handler, this.contract as unknown as Contract)
        subscribeWrapper.subscribe()
        return subscribeWrapper
    }
}