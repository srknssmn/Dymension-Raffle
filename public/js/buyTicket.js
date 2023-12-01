import {RAFFLE_ADDRESS} from "/constants/address.js";
import {RAFFLE_ABI} from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {verifyNetwork} from "/js/verifyNetwork.js";

const modalButtonOpen = document.querySelector('#modalButtonOpen')
const modal2ButtonOpen = document.querySelector('#modal2ButtonOpen')
document.querySelector("#buyTicket").addEventListener('click' , buyFunc)
const ticketCount = document.querySelector('#ticketCount')

async function buyFunc(event) {
    event.preventDefault()
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        await verifyNetwork();

        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(RAFFLE_ADDRESS, RAFFLE_ABI, signer);

        const userTicketCount = await contract?.entryCounts(signer.getAddress());
        const userTicketCountValue = await ethers.utils.formatEther(userTicketCount)
        const userTicketCountValueA = await userTicketCountValue * 10**18
        let ticketValue = ticketCount.value

        console.log(userTicketCountValueA)
        console.log(ticketValue)

        if ((Number(userTicketCountValueA) + Number(ticketValue)) <= 5) {
            let value_ = await ethers.utils.parseEther(`${1 * ticketValue}`)
            try {
                const txn = await contract.buyTicket(ticketValue, { value: value_ });
    
                await modalButtonOpen.click();
                await txn.wait();
                await modalButtonClose.click();
                await console.log("success")
                await location.reload();

            } catch(error) {
                if ((error.code === "INSUFFICIENT_FUNDS") || (error.code === -32603) || (error.code === -32000)) {
                    await modal2ButtonOpen.click();
                }
            }
        } else {
            window.alert("You can't buy that many tickets! Max. 5")
        }

    } else {
        connectWalletfunc();
    }

}