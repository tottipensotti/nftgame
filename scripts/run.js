const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('TheGame');
    const gameContract = await gameContractFactory.deploy(
        ['Batman', 'Spiderman' , 'Thor', 'Ironman'], // names
        ['https://imgur.com/6u2u5Zb', 'https://imgur.com/5rxXE1h',
            'https://imgur.com/TAz2BnA', 'https://imgur.com/h9pgPOP'], // images
        [400, 250, 600, 450], // health
        [300, 200, 600, 550 ], // attack pts
        [300, 200, 400, 350] // defense pts
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();