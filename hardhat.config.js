require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'YOUR_API_CONNECTION',
      accounts: ['YOUR_PRIVATE_KEY'],
    },
  },
};
