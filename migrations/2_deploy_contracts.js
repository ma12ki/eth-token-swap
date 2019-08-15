const TelegramFuturesToken = artifacts.require("./TelegramFuturesToken.sol");
const TelegramToken = artifacts.require("./TelegramToken.sol");
const TokenSwap = artifacts.require("./TokenSwap.sol");

module.exports = async function(deployer, network, accounts) {
  const masterAccount = accounts[0];

  await deployer.deploy(TelegramFuturesToken, { from: masterAccount });
  await TelegramFuturesToken.deployed();

  await deployer.deploy(TelegramToken, { from: masterAccount });
  await TelegramToken.deployed();

  await deployer.deploy(
    TokenSwap,
    TelegramFuturesToken.address,
    TelegramToken.address,
    { from: masterAccount }
  );
  await TokenSwap.deployed();

  console.log(TelegramToken);
};
