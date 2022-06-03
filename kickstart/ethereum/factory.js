import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const address = process.env.CAMPAIGN_ADDRESS;

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xEfc62c48b56395919079E9783EDBF2B9AABB8d01"
);

export default instance;
