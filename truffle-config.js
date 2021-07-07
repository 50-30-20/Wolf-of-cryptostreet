require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // 7545
      network_id: "*",
      // gas: 0xfffffffffff,	// <-- Use this high gas value
      // gasPrice: 0x01,	// <-- Use this low gas price
    },
    mainnet: {
      // provider: providerFactory(),
      network_id: 1,
      gas: 8000000,
      gasPrice: 115000000000,  // 115 gwei,
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          process.env.METAMASK_WALLET_SECRET,
          'https://kovan.infura.io/v3/69faa0ff70d74c9894ec5cf1a4062ff6'
        )
      },
      networkCheckTimeout: 100000,
      network_id: 42,
      skipDryRun: true
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          process.env.METAMASK_WALLET_SECRET,
          'https://rinkeby.infura.io/v3/e95c6744ded94bbe81e881b8ca002ce7'
        )
      },
      networkCheckTimeout: 100000,
      network_id: 4,
      skipDryRun: true
    }
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './abis/',
  compilers: {
    solc: {
      version: '0.8.0+commit.c7dfd78e',
      settings: {
        optimizer: {
          enabled: true,
          runs: 100000
        }
      }
    }
  },
  mocha: { useColors: true },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};