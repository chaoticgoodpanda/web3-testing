const assert = require("assert");
const ganache = require("ganache-cli");
// constructor
const Web3 = require("web3");
// instance -- connect to web3 with ganache provider
// when we go to a proper network, we replace ganache with whatever provider we want, e.g. Ethereum
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../compile");

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it("allows one account to enter", async () => {
    // attempt to enter the lottery
    await lottery.methods.enter().send({
      // first account is attempting to enter the lottery
      from: accounts[0],
      // amount in wei as a string that we want to send
      // converts ether to wei
      value: web3.utils.toWei("0.02", "ether"),
    });

    // run the getPlayers() method
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    // the account 0 index should be the player 0 index
    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("allows multiple accounts to enter", async () => {
    // attempt to enter the lottery
    await lottery.methods.enter().send({
      // first account is attempting to enter the lottery
      from: accounts[0],
      // amount in wei as a string that we want to send
      // converts ether to wei
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.enter().send({
      // first account is attempting to enter the lottery
      from: accounts[1],
      // amount in wei as a string that we want to send
      // converts ether to wei
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.enter().send({
      // first account is attempting to enter the lottery
      from: accounts[2],
      // amount in wei as a string that we want to send
      // converts ether to wei
      value: web3.utils.toWei("0.02", "ether"),
    });

    // run the getPlayers() method
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    // the account 0 index should be the player 0 index
    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it("requires a minimum amount of ether to enter", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0,
      });
      assert(false);
    } catch (err) {
      // just checks to see that some value is passed into this function, i.e. that there's an error present
      assert(err);
    }
  });

  it("only manager can call pickWinner", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("sends money to the winner and resets the players array", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });

    // returns the amount of ether in units of Wei that a given account controls
    // can be done for external accounts and contract accounts, works for any address you want
    const initialBalance = await web3.eth.getBalance(accounts[0]);

    // since accounts[0] also sent in the 2 eth, they should get back the 2 eth they sent in
    await lottery.methods.pickWinner().send({ from: accounts[0] });

    // retrieve the final balance
    const finalBalance = await web3.eth.getBalance(accounts[0]);

    // get the difference, but however even correct diff shouldn't be exactly 2 eth due to gas fees
    // diff b/w initial & final balance is 2 eth + gas fees, so slightly less than 2 eth
    const difference = finalBalance - initialBalance;
    // 1.8 is allowing for some amount of gas cost
    assert(difference > web3.utils.toWei("1.8", "ether"));
  });
});
