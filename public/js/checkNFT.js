import {RAFFLE_ADDRESS} from "/public/constants/address.js";
import {RAFFLE_ABI} from "/public/constants/abi.js";

const nftID = document.querySelector('#nftID');
const nftAddress = document.querySelector('#nftAddress');

export const checkNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RAFFLE_ADDRESS, RAFFLE_ABI, signer);
    const nftContract = await contract?.nftContract();
    const tokenId = await contract?.tokenId();
    const tokenIdValue = await ethers.utils.formatEther(tokenId)
    const tokenIdValueA = await tokenIdValue * 10**18
    nftID.innerHTML = tokenIdValueA;
    nftAddress.value = nftContract;
    console.log(nftContract);
    console.log(tokenIdValueA)
};