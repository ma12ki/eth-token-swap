const TelegramFuturesToken = artifacts.require("./TelegramFuturesToken.sol");
const TelegramToken = artifacts.require("./TelegramToken.sol");

module.exports = async function(deployer, network, accounts) {
  const [masterAccount, clientAccount] = accounts;

  await deployer.deploy(TelegramFuturesToken, { from: masterAccount });
  const futuresInstance = await TelegramFuturesToken.deployed();

  await deployer.deploy(TelegramToken, TelegramFuturesToken.address, {
    from: masterAccount
  });
  await TelegramToken.deployed();

  await futuresInstance.transfer(clientAccount, 1337, { from: masterAccount });
};
