require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { PRIVATE_KEY, SEPOLIA_URL_KEY, ETHERSCAN_API_KEY } = process.env;
module.exports = {
  solidity: "0.8.30",
    networks: {
    sepolia: {
      url: SEPOLIA_URL_KEY,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};