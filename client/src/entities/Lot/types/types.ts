export interface ILotData {
    tokenID: string,
    price: number,
    deposit: number, // сумма за принятие участия
    ETH_step: number, // шаг роста price
    waitingStatus: number, // сколько блоков длится ожидание
    blockStep: number, // шаг повышения цены
    initBlock: number, // текущий блок
    members: number, // количество участников
    isMember: boolean,
    isWaiting: boolean,
    isNFTOwner: boolean,
}