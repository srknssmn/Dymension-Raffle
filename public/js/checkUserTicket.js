import {RAFFLE_ADDRESS} from "/constants/address.js";
import {RAFFLE_ABI} from "/constants/abi.js";

const userTicketCount = document.querySelector('#userTicketCount');

export const checkTicketCount= async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RAFFLE_ADDRESS, RAFFLE_ABI, signer);
    const ticketCount = await contract?.entryCounts(signer.getAddress());
    userTicketCount.innerHTML = ticketCount;
};



