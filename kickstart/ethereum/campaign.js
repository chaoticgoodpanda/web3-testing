import web3 from "./web3";
import Campaign from "./build/Campaign.json";

export default function CampaignInfo(address) {
  return new web3.eth.Contract(Campaign.abi, address);
}
