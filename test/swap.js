const truffleAssert = require("truffle-assertions");

const TelegramFuturesToken = artifacts.require("TelegramFuturesToken");
const TelegramToken = artifacts.require("TelegramToken");
const TokenSwap = artifacts.require("TokenSwap");

contract("Swap", function(accounts) {
  let telegramFutures;
  let telegram;
  let tokenSwap;
  const masterAccount = accounts[0];
  const clientAccount = accounts[2];

  console.log({
    masterAccount,
    clientAccount
  });

  beforeEach(async () => {
    telegramFutures = await TelegramFuturesToken.new({ from: masterAccount });
    telegram = await TelegramToken.new({ from: masterAccount });
    console.log({
      futuresAddress: telegramFutures.address,
      targetAddress: telegram.address
    });
    tokenSwap = await TokenSwap.new(telegramFutures.address, telegram.address, {
      from: masterAccount
    });

    await telegramFutures.transfer(clientAccount, 1337, {
      from: masterAccount
    });
  });

  it("swaps token", async () => {
    const masterBalanceFutures = await telegramFutures.balanceOf.call(
      masterAccount
    );
    const clientBalanceFutures = await telegramFutures.balanceOf.call(
      clientAccount
    );
    console.log({
      masterBalanceFutures: masterBalanceFutures.toString(),
      clientBalanceFutures: clientBalanceFutures.toString()
    });

    await telegramFutures.approve(telegramFutures.address, 100, {
      from: clientAccount
    });

    // const contractBalance = await telegram.balanceOf.call(telegram.address);
    // console.log({ contractBalance: contractBalance.toString() });

    // const tx = await telegramFutures.burn(100, { from: masterAccount });
    const tx = await tokenSwap.swap(100, { from: clientAccount });

    truffleAssert.eventEmitted(tx, "Swap", ev => {
      console.log("event", { ev });

      return ev.from == account && ev.amount == 100;
    });

    // const balanceAfter = await tf.balanceOf.call(accounts[0]);
    // const balanceAfter2 = await t.balanceOf.call(accounts[0]);
    // console.log(balanceAfter.toString());
    // console.log(balanceAfter2.toString());

    assert.isTrue(true);
  });
});
