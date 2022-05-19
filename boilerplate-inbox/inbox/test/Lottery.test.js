const assert = require('assert');
const ganache = require('ganache-cli');
// constructor
const Web3 = require('web3');
// instance -- connect to web3 with ganache provider
// when we go to a proper network, we replace ganache with whatever provider we want, e.g. Ethereum
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        // attempt to enter the lottery
        await lottery.methods.enter().send({
            // first account is attempting to enter the lottery
            from: accounts[0],
            // amount in wei as a string that we want to send
            // converts ether to wei
            value: web3.utils.toWei('0.02', 'ether')
        });

        // run the getPlayers() method
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // the account 0 index should be the player 0 index
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple accounts to enter', async () => {
        // attempt to enter the lottery
        await lottery.methods.enter().send({
            // first account is attempting to enter the lottery
            from: accounts[0],
            // amount in wei as a string that we want to send
            // converts ether to wei
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            // first account is attempting to enter the lottery
            from: accounts[1],
            // amount in wei as a string that we want to send
            // converts ether to wei
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            // first account is attempting to enter the lottery
            from: accounts[2],
            // amount in wei as a string that we want to send
            // converts ether to wei
            value: web3.utils.toWei('0.02', 'ether')
        });

        // run the getPlayers() method
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // the account 0 index should be the player 0 index
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });
});

