const {ethers} = require('hardhat')

async function main() {
    setInterval(async () => {
        await ethers.provider.send('evm_mine', [])
    }, 15000)
}

main()