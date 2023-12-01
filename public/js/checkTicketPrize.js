import {RAFFLE_ADDRESS} from "/constants/address.js";
import {RAFFLE_ABI} from "/constants/abi.js";

const ticketPrize = document.querySelector('#ticketPrize');

export const checkTicketPrize = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RAFFLE_ADDRESS, RAFFLE_ABI, signer);
    const ticketCost = await contract?.ticketCost();
    const ticketCostValue = ethers.utils.formatEther(ticketCost)
    console.log(ticketCostValue);
    ticketPrize.innerHTML = ticketCostValue;
};