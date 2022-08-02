const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('TheGame');
    const gameContract = await gameContractFactory.deploy(
        [], // names
        [], // images
        [], // health
        [], // attack pts
        [] // defense pts



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