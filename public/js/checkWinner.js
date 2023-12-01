import {RAFFLE_ADDRESS} from "/constants/address.js";
import {RAFFLE_ABI} from "/constants/abi.js";

const winnerSection = document.querySelector('#winnerSection')
const winnerAddressValue = document.querySelector('#winnerAddress')

export const checkWinner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RAFFLE_ADDRESS, RAFFLE_ABI, signer);
    const winnerAddress = await contract?.winnerAddress();

    if (winnerAddress != "0x0000000000000000000000000000000000000000") {
        winnerSection.hidden = false
        winnerAddressValue.innerHTML = winnerAddress;
    }
};