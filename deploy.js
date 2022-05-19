const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'e6265c254a80fb9106a082f69bbe26a6a3ec836fd8f0bcbf6be07d98120a4e39',
    // remember to change this to your own phrase!
    'https://rinkeby.infura.io/v3/fe7747126d174405b3480d489f1dc0fd'
    // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();
