const {ethers} = require('hardhat')

function jsonToContractBytes(jsonObj) {
    const jsonString = JSON.stringify(jsonObj)
    const byteArray = ethers.toUtf8Bytes(jsonString)
    return ethers.hexlify(byteArray)
}

async function main() {
    const [deployer] = await ethers.getSigners()

    console.log('Deploying contracts with the account:', deployer.address)

    const Token = await ethers.getContractFactory('Auction')
    const token = await Token.deploy(jsonToContractBytes({
        title: 'хуяк хуяк и мертв хомяк'
    }))
    
    console.log('Token address:', token.target)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })