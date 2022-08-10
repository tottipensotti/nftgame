// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// NFT contract from Open Zeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

import "./libraries/Base64.sol";

contract TheGame is ERC721 {
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

        // NFTs unique identifier
        using Counters for Counters.Counter;
        Counters.Counter private _tokenIds;

        CharacterAttributes[] defaultCharacters;

        // mapping NFT's Id - Attributes (struct) and NFT's Id - Address
        mapping(uint256 => CharacterAttributes) public nftHolderAttributes;
        mapping(address => uint256) public nftHolders;
        
        event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
        event AttackComplete(address sender, uint newBossHp, uint newPlayerHp);

        constructor (
            string[] memory characterNames,
            string[] memory characterImageURIs,
            uint[] memory characterHp,
            uint[] memory characterAttackDmg,
            uint[] memory characterDefensePts,
            string memory bossName,
            string memory bossImageURI,
            uint bossHp,
            uint bossAttackDamage,
            uint bossDefensePoints
        ) 
            ERC721("Heroes", "HERO")
        {   

            bigBoss = BigBoss({
                name: bossName,
                imageURI: bossImageURI,
                hp: bossHp,
                maxHp: bossHp,
                attackDamage: bossAttackDamage,
                defensePoints: bossDefensePoints
            });

            console.log("Done initializing boss %s w/ HP %s, img %s", bigBoss.name, bigBoss.hp, bigBoss.imageURI);


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

            // Increment the Id of the NFTs
            _tokenIds.increment();
        }

        function mintCharacterNFT(uint _characterIndex) external {
            
            uint256 newItemId = _tokenIds.current();
            
            _safeMint(msg.sender, newItemId);

            nftHolderAttributes[newItemId] = CharacterAttributes ({
                characterIndex: _characterIndex,
                name: defaultCharacters[_characterIndex].name,
                imageURI: defaultCharacters[_characterIndex].imageURI,
                hp: defaultCharacters[_characterIndex].hp,
                maxHp: defaultCharacters[_characterIndex].maxHp,
                attackDamage: defaultCharacters[_characterIndex].attackDamage,
                defensePoints: defaultCharacters[_characterIndex].defensePoints
            });

            console.log("Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex);

            // Just to see the NFT owners
            nftHolders[msg.sender] = newItemId;

            _tokenIds.increment();
            emit CharacterNFTMinted(msg.sender, newItemId, _characterIndex);
        }

        struct BigBoss {
                string name;
                string imageURI;
                uint hp;
                uint maxHp;
                uint attackDamage;
                uint defensePoints;
            }
            BigBoss public bigBoss;

        function tokenURI(uint256 _tokenId) public view override returns (string memory) {
            // Retrieve the NFT data
            CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId];

            string memory strHp = Strings.toString(charAttributes.hp);
            string memory strMaxHp = Strings.toString(charAttributes.maxHp);
            string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);
            string memory strDefensePoints = Strings.toString(charAttributes.defensePoints);

            // Give it a JSON format!
            string memory json = Base64.encode(
                abi.encodePacked(
                    '{"name": "', charAttributes.name,
                    ' -- NFT #: ', Strings.toString(_tokenId),
                    '", "description": "This is an NFT that lets people play in The Game", "image": "',
                    charAttributes.imageURI,
                    '", "attributes": [ { "trait_type": "Health Points", "value": ',strHp,
                    ', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage", "value": ', strAttackDamage,
                    '{ "trait_type": "Defense Points", "value": ', strDefensePoints, '} ]}'
                    )
                );
            
            string memory output = string (
                abi.encodePacked("data:application/json;base64,", json)
            );

            return output;
        }

        function attackBoss() public {
            // player's NFT state
            uint256 nftId = nftHolders[msg.sender];
            CharacterAttributes storage player = nftHolderAttributes[nftId];
            
            console.log("\nPlayer w/ character %s attacking. Has %s HP and %s AD", player.name, player.hp, player.attackDamage);
            console.log("Boss %s has %s HP and %s AD", bigBoss.name, bigBoss.hp, bigBoss.attackDamage);

            // It's alive? Hp > 0
            require (
                player.hp > 0, "You can't attack. Your character is dead!"
            );
            // Boss is alive? Hp > 0
            require (
                bigBoss.hp > 0, "You've already defeated this boss!"
            );
            // Player attacks
            if (bigBoss.hp < player.attackDamage) {
                bigBoss.hp = 0;
            } else {
                bigBoss.hp = bigBoss.hp - (player.attackDamage - bigBoss.defensePoints);
            }
            // Boss attacks
            if (player.hp < bigBoss.attackDamage) {
                player.hp = 0;
            } else {
                player.hp = player.hp - (bigBoss.attackDamage - player.defensePoints);
            }

            console.log("Player attacked. New boss hp: %s", bigBoss.hp);
            console.log("%s attacked. New player hp: %s", bigBoss.name, player.hp);

            emit AttackComplete(msg.sender, bigBoss.hp, player.hp);
        }

        function checkNFT() public view returns (CharacterAttributes memory) {
            uint256 NftId = nftHolders[msg.sender];
            if (NftId > 0) {
                return nftHolderAttributes[NftId];
            }

            else {
                CharacterAttributes memory emptyStruct;
                return emptyStruct;
            }
        }

        function getAllDefaultCharacters() public view returns (CharacterAttributes[] memory) {
            return defaultCharacters;
        }

        function getBigBoss() public view returns (BigBoss memory) {
            return bigBoss;
        }
    }