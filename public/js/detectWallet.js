import {checkLottery} from "/public/js/checkLottery.js";
import {checkTicketPrize} from "/public/js/checkTicketPrize.js";
import {checkTicketCount} from "/public/js/checkUserTicket.js";
import {checkNFT} from "/public/js/checkNFT.js";
import {checkWinner} from "/public/js/checkWinner.js";
import {usersArrayFunc} from "/public/js/checkUserArray.js";

window.onload = () => {
    isConnected();
};

let connectWalletButton = document.querySelector('#connectWallet')
let connectSection = document.querySelector('#connectSection')
let lotteryStatusDiv = document.querySelector('#lotteryStatusDiv')

async function isConnected() {
    const accounts = await ethereum.request({method: 'eth_accounts'});       
    if (accounts.length) {
        connectSection.hidden = await true;
        await console.log(`You're connected to: ${accounts[0]}`);
        checkLottery();
        checkTicketPrize();
        checkTicketCount();
        checkNFT();
        checkWinner();
        let userWallet = await accounts[0]
        connectWalletButton.disabled = await true;
        let first = await userWallet.slice(0, 5)
        let last = await userWallet.slice(-5)
        connectWalletButton.innerHTML = await first + "..." + last
        usersArrayFunc();
    } else {
        console.log("Metamask is not connected");
        connectSection.hidden = await false;
    }
}