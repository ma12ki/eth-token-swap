const TelegramFuturesToken = artifacts.require("./TelegramFuturesToken.sol");
const TelegramToken = artifacts.require("./TelegramToken.sol");
const TokenSwap = artifacts.require("./TokenSwap.sol");

module.exports = async function(deployer, network, accounts) {
  const masterAccount = accounts[0];

  await deployer.deploy(TelegramFuturesToken, { from: masterAccount });
  await TelegramFuturesToken.deployed();

  console.log({
    deployedFuturesAddress: TelegramFuturesToken.address
  });

  await deployer.deploy(TelegramToken, TelegramFuturesToken.address, {
    from: masterAccount
  });
  await TelegramToken.deployed();

  await deployer.deploy(
    TokenSwap,
    TelegramFuturesToken.address,
    TelegramToken.address,
    { from: masterAccount }
  );
  await TokenSwap.deployed();

  // console.log(TelegramToken);
};
