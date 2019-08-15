pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

/**
* @title Telegram Token
*/
contract TelegramToken is ERC20, Ownable {

    string public name;
    string public symbol;
    uint32 public decimals;

    /**
      * @dev assign totalSupply to account creating this contract
      */
    constructor() public {
        symbol = "TON";
        name = "Telegram";
        decimals = 7;
        _mint(address(this), 1337000);
    }
}
