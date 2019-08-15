pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

/**
* @title Universal Token Swap Contract
*/
contract TokenSwap is Ownable {

    ERC20Burnable futures;
    ERC20 target;

    event Swap(address from, uint amount);

    constructor(address _futures, address _target) public {
        futures = ERC20Burnable(_futures);
        target = ERC20(_target);
    }

    function swap(uint _amount) public {
      address _from = msg.sender;
      futures.burnFrom(_from, _amount);
      emit Swap(_from, _amount);
    }

}
