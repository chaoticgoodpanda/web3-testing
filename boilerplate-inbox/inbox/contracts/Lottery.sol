// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    // creates a dynamic array that can only contain addresses
    address payable[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        // requires that some requirement has been satisfied before the rest of the function can be run
        // this requirement ensures that people ahve sent some amount of money
        // note that we have to write out "ether" to tell the compiler that it's ether and not Wei
        // requires strongly kicks you out, but there's no clear message to tell you why it failed
        require(msg.value > .01 ether);

        players.push(payable(msg.sender));
    }

    // private because we really don't want anyone else to call this function
    // view b/c not modifying any data or state in contract
    // returns because it returns some value (uint returns 256-unsigned int)
    function random() private view returns (uint) {
        // global variable, might also see keccak256();, same thing
        // block global variable can call at any given time
        // difficulty is difficulty level to solve/seal the current block
        // current time is global variable of 'now'
        // also pass in array of players
        // passing the result into a uint and return it
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    // restricted modifier used here
    function pickWinner() public restricted {

        // note random() function is only pseudo-random
        uint index = random() % players.length;
        // transfer() attempts to take some amount out of current contract and send to players' address
        // this.balance takes *all* of the money out of the current contract
        players[index].transfer(address(this).balance);
        // creates a brand-new dynamic array of type address -- not fixed b/c no number in []
        // (0) is the initial length, 0. Can do (5), and initial length would have been 5.
        // if there are no addresses to populate in a 5-length array, 0x0000 default addresses are populated, which we do not want, which is why we do 0-length.
        players = new address payable[](0);
    }

    // defining a new function modifier to be added to our contract called restricted
    modifier restricted() {
        // make sure whoever is calling this function is in fact the manager (the person who originally created the contract)
        // can't just have anybody call this function
        require(msg.sender == manager);
        // the underscore is like a target that takes all the code out of a restricted function and sticks it in where the underscore is
        _;
    }

    // returns a dynamic array of addresses
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}