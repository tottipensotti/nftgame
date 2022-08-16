const CONTRACT_ADDRESS = '0xa6Ced676fc33a0256974539cfb39F5C3003fd51d'

const transformCharacterData = (characterData) => {
    return {
        name: characterData.name,
        imageURI: characterData.imageURI,
        hp: characterData.hp.toNumber(),
        maxHp: characterData.maxHp.toNumber(),
        attackDamage: characterData.attackDamage.toNumber(),
    };
};


export { CONTRACT_ADDRESS, transformCharacterData };