import {RAFFLE_ADDRESS} from "/public/constants/address.js";
import {RAFFLE_ABI} from "/public/constants/abi.js";

const lotteryStatusDiv = document.querySelector('#lotteryStatusDiv');
const lotteryStatusSpan = document.querySelector('#lotteryStatusSpan');
const buyTicket = document.querySelector('#buyTicket');

export const checkLottery = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RAFFLE_ADDRESS, RAFFLE_ABI, signer);
    const lotterySituation = await contract?.lotteryStatus();
    console.log(lotterySituation);
    if (!lotterySituation) {
        buyTicket.disabled = true;
        lotteryStatusSpan.innerHTML = "CLOSE"
        lotteryStatusDiv.style.background = "#f3f3f3"
        lotteryStatusDiv.classList.add("border-danger-subtle")
    } else {
        buyTicket.disabled = false;
        lotteryStatusSpan.innerHTML = "OPEN"
        lotteryStatusDiv.style.background = "#6bc16312"
        lotteryStatusDiv.classList.add("border-success")
    }
};