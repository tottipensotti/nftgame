// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TheGame {
        // let's set up the character attributes
        struct CharacterAttributes {
            uint characterIndex;
            string name;
            string imageURI;
            uint hp;
            uint maxHp;
            uint attackDamage;
            uint defensePoints;
        }

        CharacterAttributes[] defaultCharacters;

        constructor (
            string[] memory characterNames,
            string[] memory characterImageURIs,
            uint[] memory characterHp,
            uint[] memory characterAttackDmg,
            uint[] memory characterDefensePts
        ) {
            for (uint i = 0; i < characterNames.length; i += 1) {
                defaultCharacters.push(CharacterAttributes({
                    characterIndex: i,
                    name: characterNames[i],
                    imageURI: characterImageURIs[i],
                    hp: characterHp[i],
                    maxHp: characterHp[i],
                    attackDamage: characterAttackDmg[i],
                    defensePoints: characterDefensePts[i]
                }));

                CharacterAttributes memory c = defaultCharacters[i];
                console.log("Done initializing %s w/ HP %s, img %s", c.name, c.hp, c.imageURI);

            }

        }
    }