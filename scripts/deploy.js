const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('TheGame');
    const gameContract = await gameContractFactory.deploy(
        ['Batman', 'Spiderman' , 'Thor', 'Ironman'], // names
        ['https://imgur.com/6u2u5Zb', 'https://imgur.com/5rxXE1h',
            'https://imgur.com/TAz2BnA', 'https://imgur.com/h9pgPOP'], // images
        [400, 300, 600, 450], // health
        [45, 45, 60, 100 ], // attack pts
        [30, 20, 40, 50], // defense pts
        "Dragon",
        "https://i.imgur.com/63VSlxL.jpeg",
        10000,
        60,
        40
    );
    
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
    
    // TokenURI is a function inherited from ERC721 that returns the data attached to the NFT
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
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