const Migrations = artifacts.require('../Migrations.sol')
const TovarCoin = artifacts.require('../TovarCoin.sol')

module.exports = deployer => {
  deployer.deploy(Migrations)
  deployer.deploy(TovarCoin('1e28', 'TovarCoin', 'TVR', 18))
};
