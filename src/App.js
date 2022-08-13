import React from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'tottipensotti';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const BUILDSPACE_HANDLE = 'https://twitter.com/_buildspace';

const App = () => {
    return (
        <div className = 'App'>
            <div className = 'container'>
                <div className = 'header-container'>
                    <p className = 'header gradient-text'>⚔️ Metaverse Slayer ⚔️</p>
                    <p className = 'sub-text'>Protect the Metaverse!</p>
                    <div className = 'connect-wallet-container'>
                        <img
                            src = 'https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv'
                            alt = 'Mnty Python GIF'
                        />
                    </div>
                </div>
                <div className = 'footer-container'>
                    <img alt = 'Twitter logo' className = 'twitter-logo' src={twitterLogo} />
                    <a
                        className = 'footer-text'
                        href = {TWITTER_LINK}
                        target= '_blank'
                        rel = 'noreferrer'
                    >{`built by @${TWITTER_HANDLE} with @${BUILDSPACE_HANDLE}`}</a>
                </div>
            </div>
        </div>
    );
};

export default App;