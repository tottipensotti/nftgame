import React, { useEffect, useState } from 'react';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';

import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import TheGame from './utils/TheGame.json';
import { ethers } from 'ethers';

import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = 'tottipensotti';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
//const BUILDSPACE_HANDLE = 'https://twitter.com/_buildspace';

const App = () => {
    // State
    const [currentAccount, setCurrentAccount] = useState(null);
    const [characterNFT, setCharacterNFT] = useState(null);

    // Actions
    const isWalletConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log('Make sure you have MetaMask installed!');
                return;
            } else {
                console.log('We have the ethereum object', ethereum);
                
                const accounts = await ethereum.request({ method: 'eth_accounts' });
                
                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log('Found an authorized account:', account);
                    setCurrentAccount(account);
                } else {
                    console.log('No authorized account found');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const renderContent = () => {
        if (!currentAccount) {
            return (
                <div className = 'connect-wallet-container'>
                    
                    <img
                        src = 'https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv'
                        alt = 'Monty Python GIF'
                    />
                    <button
                        className = 'cta-button connect-wallet-button'
                        onClick = {connectWalletAction}
                    >
                        Connect Wallet To Get Started
                    </button>
                </div>
            );
        } else if (currentAccount && !characterNFT) {
            return < SelectCharacter setCharacterNFT = {setCharacterNFT} />;
        }
    };

    const connectWalletAction = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts', });

            console.log('Connected', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkNetwork = async () => {
            try {
                if (window.ethereum.networkVersion !== '4') {
                    alert('Please connect to Rinkeby!')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, []);
    
    useEffect(() => {
        isWalletConnected();
    }, []);

    useEffect(() => {
        const fetchNFTMetadata = async () => {
            console.log('Checking for Character NFT on address:', currentAccount);
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                TheGame.abi,
                signer
            );

            const txn = await gameContract.checkNFT();
            if (txn.name) {
                console.log('User has character NFT');
                setCharacterNFT(transformCharacterData(txn));
            } else {
                console.log('No character NFT found');
            }
        };

        if (currentAccount) {
            console.log('Current Account:', currentAccount);
            fetchNFTMetadata();
        }
    }, [currentAccount]);

    return (
        <div className = 'App'>
            <div className = 'container'>
                <div className = 'header-container'>
                    <p className = 'header gradient-text'>⚔️ Metaverse Slayer ⚔️</p>
                    <p className = 'sub-text'>Protect the Metaverse!</p>
                    {renderContent()}
                </div>
                <div className = 'footer-container'>
                    <img alt = 'Twitter logo' className = 'twitter-logo' src={twitterLogo} />
                    <a
                        className = 'footer-text'
                        href = {TWITTER_LINK}
                        target= '_blank'
                        rel = 'noreferrer'
                    >{`built by @${TWITTER_HANDLE}`}</a>
                </div>
            </div>
        </div>
    );
};

export default App;