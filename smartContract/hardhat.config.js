require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */

const API_KEY = "KIIQzsj9m5c51EWVwdd42Qeq6m1OmgXP";
const SEPOLIA_PRIVATE_KEY =
  "a8db26aa29da236ec52f34f5361a836acf86ad1b0d18bbfe36361b14996dd373";

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "UKN1WBAVR44YS975DRKH1UZTYY9RE1CN5P",
    },
  },
};

// const API_KEY="WTA9_FSivrh9WxrwKhb1pv4DtCQQdhCv";
// const SEPOLIA_PRIVATE_KEY="a8db26aa29da236ec52f34f5361a836acf86ad1b0d18bbfe36361b14996dd373";

// module.exports = {
//   solidity: "0.8.4",
//   paths:{
//     artifacts: './src/backend/artifacts',
//     sources: './src/backend/contracts',
//     cache: './src/backend/cache',
//     tests: './src/backend/test'
//   },
//   }
// };
