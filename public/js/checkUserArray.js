import {RAFFLE_ADDRESS} from "/constants/address.js";
import {RAFFLE_ABI} from "/constants/abi.js";

let usersArrayDiv = document.querySelector('#usersArray')

export const usersArrayFunc = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RAFFLE_ADDRESS, RAFFLE_ABI, signer);
    
    const userArray = await contract.getPlayers();

    for (let i = 0 ; i < userArray.length ; i++ ) {
        if (i < 10) {
            const listItem = document.createElement("li");
            const div =  document.createElement("div");
            div.classList.add("d-flex" , "flex-row")
            listItem.appendChild(div);
            const kicker = document.createElement("p");
            const space2 = document.createElement("p");
            space2.innerHTML = "&nbsp | Ticket Count: &nbsp"
            const kickerCount = document.createElement("p");
            div.appendChild(kicker);
            div.appendChild(space2);
            div.appendChild(kickerCount);
            kicker.innerHTML = userArray[i]
            kickerCount.innerHTML= await contract?.entryCounts(userArray[i])
            usersArrayDiv.appendChild(div);
        }
    }
};