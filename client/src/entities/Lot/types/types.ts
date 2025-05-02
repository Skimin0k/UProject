export interface ILotData {
    tokenID: string,
    price: string,
    deposit: string, // сумма за принятие участия
    ETH_step: string, // шаг роста price
    waitingStatus: string, // сколько блоков длится ожидание
    blockStep: string, // шаг повышения цены
    initBlock: string, // текущий блок
    members: string, // количество участников
    isMember: boolean,
    isWaiting: boolean,
    isNFTOwner: boolean,
    data: object
}