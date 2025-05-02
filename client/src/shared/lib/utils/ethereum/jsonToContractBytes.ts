import { ethers } from 'ethers'
export default function jsonToContractBytes(jsonObj: object) {
    const jsonString = JSON.stringify(jsonObj)
    const byteArray = ethers.toUtf8Bytes(jsonString)
    return ethers.hexlify(byteArray)
}