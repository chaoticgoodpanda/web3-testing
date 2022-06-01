// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14-fixed;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

}