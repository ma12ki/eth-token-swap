pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

/**
* @title Telegram Futures Token
*/
contract TelegramFuturesToken is ERC20Burnable, Ownable {

    string public name;
    string public symbol;
    uint32 public decimals;

    /**
      * @dev assign totalSupply to account creating this contract
      */
    constructor() public {
        symbol = "xGRAM";
        name = "Telegram Futures";
        decimals = 7;
        _mint(msg.sender, 1337000);
    }
}
