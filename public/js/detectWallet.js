import {checkLottery} from "/js/checkLottery.js";
import {checkTicketPrize} from "/js/checkTicketPrize.js";
import {checkTicketCount} from "/js/checkUserTicket.js";
import {checkNFT} from "/js/checkNFT.js";
import {checkWinner} from "/js/checkWinner.js";
import {usersArrayFunc} from "/js/checkUserArray.js";

window.onload = () => {
    isConnected();
};

let connectWalletButton = document.querySelector('#connectWallet')
let connectSection = document.querySelector('#connectSection')
const buyTicket = document.querySelector('#buyTicket');

async function isConnected() {
    const accounts = await ethereum.request({method: 'eth_accounts'});       
    if (accounts.length) {
        connectSection.hidden = await true;
        buyTicket.disabled = false;
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
        buyTicket.disabled = true;
    }
}