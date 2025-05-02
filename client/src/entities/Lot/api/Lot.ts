import LotRoomApi from 'artifacts/contracts/LotRoom.sol/LotRoom.json'
import {LotRoom as ILot} from 'artifacts/typechain/contracts/LotRoom'
import {Contract,Provider,Signer} from 'ethers'
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
        return this.contract.raiseHand()
    }

    async downHand(){
        return this.contract.downHand()
    }

    async buy(){
        return this.contract.buy()
    }

    async getFinalPrice(){
        return this.contract.getFinalPrice()
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
            isWaiting
        ] = await this.contract.getLotRoomInfo()
        const result = {
            tokenID: tokenID.toString(),
            price: Number(price), //начальная цена лота в эфирах
            deposit: Number(deposit), // сумма за принятие участия
            ETH_step: Number(ETH_step), // шаг роста price
            waitingStatus: Number(waitingStatus), // сколько блоков длится ожидание
            blockStep: Number(blockStep), // шаг повышения цены
            initBlock: Number(initBlock), // текущий блок
            members: Number(countOfMembers), // количество участников
            isWaiting,
            isNFTOwner: false,
            isMember: false,
        }
        if ('getAddress' in this.providerOrSigner) {
            const address = this.providerOrSigner?.getAddress?.()
            result.isNFTOwner = await this.contract.isNFTOwner(address)
            result.isMember = await this.contract.isMember(address)
        }

        return result
    }

    updateProvider(providerOrSigner: Signer | Provider) {
        this.contract.connect(providerOrSigner)
        this.providerOrSigner = providerOrSigner
    }

    subscribeRoomUpdated(handler: (args: any[]) => void) {
        return this.subscribe(LotEvents.ROOM_UDPATED, handler)
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