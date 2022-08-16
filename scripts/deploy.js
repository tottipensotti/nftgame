const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('TheGame');
    const gameContract = await gameContractFactory.deploy(
        ['Batman', 'Spiderman' , 'Thor', 'Ironman'], // names
        ['https://i.imgur.com/6u2u5Zb.jpg', 'https://i.imgur.com/5rxXE1h.jpg',
            'https://i.imgur.com/TAz2BnA.jpg', 'https://i.imgur.com/h9pgPOP.jpg'], // images
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
    // 0xF9c9196B6c65d67e4597969F18EdAa3A1CF18455
    console.log("Contract deployed to:", gameContract.address);
    
    let txn;
    txn = await gameContract.mintCharacterNFT(0);
    await txn.wait();
    console.log('Minted NFT #2');


    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    console.log('Minted NFT #2');


    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    console.log('Minted NFT #2');

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