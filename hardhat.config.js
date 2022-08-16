require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://aged-old-field.rinkeby.discover.quiknode.pro/50c7c9deb70648805dc2f856c34b1ea2d5b85d06/',
      accounts: ['ad59d26909bd6a2a20ca8ba08c7e05886dda0909b9706aac3d990c416a484be1'],
    },
  },
};
