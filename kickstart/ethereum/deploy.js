// Load environment variables.
// require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const mnemonicPhrase =
  "e6265c254a80fb9106a082f69bbe26a6a3ec836fd8f0bcbf6be07d98120a4e39";
const network = "https://rinkeby.infura.io/v3/fe7747126d174405b3480d489f1dc0fd";

const provider = new HDWalletProvider(
  "e6265c254a80fb9106a082f69bbe26a6a3ec836fd8f0bcbf6be07d98120a4e39",
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/fe7747126d174405b3480d489f1dc0fd"
  // remember to change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0] })
    .catch((err) => console.log(err));

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
