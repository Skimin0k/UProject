import {ethers} from 'ethers'
export default function contractBytesToJson(bytesHex: string) {
    // 1. Переводим hex в UTF-8 строку
    const jsonString = ethers.toUtf8String(bytesHex)
    // 2. Парсим строку в объект
    return JSON.parse(jsonString)
}