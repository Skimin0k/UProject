/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomicfoundation/hardhat-ethers')
require('dotenv').config()

const { __PRIVATE_KEY__ } = process.env
module.exports = {
    solidity: '0.8.17',
    defaultNetwork: 'ganache',
    networks: {
        hardhat: {},
        ganache: {
            url: 'HTTP://127.0.0.1:7545',
            accounts: [__PRIVATE_KEY__],
            chainId: 1337
        }
    },
    paths: {artifacts: './src/artifacts'}
}