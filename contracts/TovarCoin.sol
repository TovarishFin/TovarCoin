pragma solidity 0.4.19;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract TovarCoin is StandardToken, Ownable {
  uint256 public initialSupply;
  string public name;
  string public symbol;
  uint256 public decimals;
  uint256 public totalSupply;

  function TovarCoin(
    uint256 _totalSupply,
    string _name,
    string _symbol,
    uint256 _decimals
  )
    public
  {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply = _totalSupply;
    initialSupply = _totalSupply;
    balances[this] = _totalSupply;
  }

  function distributeTokens(
    address _recipient,
    uint _amount
  )
    public
    onlyOwner
  {
    balances[this] = balances[this].sub(_amount);
    balances[_recipient] = balances[_recipient].add(_amount);
  }
}
