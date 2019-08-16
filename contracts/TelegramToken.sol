pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

/**
* @title Telegram Token
*/
contract TelegramToken is ERC20, Ownable {

    string public name;
    string public symbol;
    uint32 public decimals;
    ERC20Burnable futures;

    event Swap(address from, uint256 amount);

    /**
      * @dev assign totalSupply to account creating this contract
      */
    constructor(address _futures) public {
        symbol = "TON";
        name = "Telegram";
        decimals = 7;
        futures = ERC20Burnable(_futures);
        _mint(address(this), 1337000);
    }

    function swap(uint256 _amount) public {
      address _sender = msg.sender;
      futures.burnFrom(_sender, _amount);
      _approve(address(this), _sender, _amount);
      transferFrom(address(this), _sender, _amount);
      emit Swap(_sender, _amount);
    }
}
