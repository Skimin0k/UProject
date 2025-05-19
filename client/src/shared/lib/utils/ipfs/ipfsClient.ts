import { create } from 'ipfs-http-client'

export const ipfsClient = create({
    url: process.env.REACT_APP_IPFS_API_URL || 'http://127.0.0.1:5001/api/v0',
})

export function getIpfsUrl(ipfsUri?: string): string | undefined {
    if(!ipfsUri) {
        return
    }
    const cid = ipfsUri.startsWith('ipfs://') ? ipfsUri.slice(7) : ipfsUri
    const gateway = process.env.REACT_APP_IPFS_GATEWAY || 'http://127.0.0.1:8080/ipfs'
    return `${gateway}/${cid}`
}
