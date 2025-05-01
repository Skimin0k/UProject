import * as LotRoomApi from 'artifacts/contracts/LotRoom.sol/LotRoom.json'
import {LotRoom as ILotRoom} from 'artifacts/typechain/contracts/LotRoom'
import {Contract,Provider,Signer} from 'ethers'

export class LotRoom {
    private contract: ILotRoom

    constructor(address: string, providerOrSigner: Signer | Provider) {
        this.contract = new Contract(address, LotRoomApi.abi, providerOrSigner) as unknown as ILotRoom
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

    async getInfo() {
        return Promise.all([
            this.contract.getStaticInfo(),
            this.contract.getCountOfMembers(),
            this.contract.isMember(),
            this.contract.isWaiting(),
            this.contract.isNFTOwner()]).then(([staticInfo, members, isMember, isWaiting, isNFTOwner]) => {
            const [
                tokenID,
                initBlock,
                price,
                deposit,
                ETH_step,
                waitingStatus,
                blockStep
            ] = staticInfo

            return {
                tokenID: tokenID.toString(),
                price, //начальная цена лота в эфирах
                deposit, // сумма за принятие участия
                ETH_step, // шаг роста price
                waitingStatus: Number(waitingStatus), // сколько блоков длится ожидание
                blockStep: Number(blockStep), // шаг повышения цены
                initBlock: Number(initBlock), // текущий блок
                members: Number(members), // количество участников
                isMember,
                isWaiting,
                isNFTOwner,
            }
        })
    }

    updateProvider(providerOrSigner: Signer | Provider) {
        this.contract.connect(providerOrSigner)
    }
}