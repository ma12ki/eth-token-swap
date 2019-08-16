const truffleAssert = require("truffle-assertions");

const TelegramFuturesToken = artifacts.require("TelegramFuturesToken");
const TelegramToken = artifacts.require("TelegramToken");
const TokenSwap = artifacts.require("TokenSwap");

contract("Swap", function(accounts) {
  let telegramFutures;
  let telegram;
  let tokenSwap;
  const masterAccount = accounts[0];
  const clientAccount = accounts[1];

  console.log({
    masterAccount,
    clientAccount
  });

  beforeEach(async () => {
    telegramFutures = await TelegramFuturesToken.new({ from: masterAccount });
    telegram = await TelegramToken.new(telegramFutures.address, {
      from: masterAccount
    });
    console.log({
      futuresAddress: telegramFutures.address,
      targetAddress: telegram.address
    });

    await telegramFutures.transfer(clientAccount, 1337, {
      from: masterAccount
    });
  });

  it("swaps token", async () => {
    await checkBalances();

    await telegramFutures.approve(telegram.address, 100, {
      from: clientAccount
    });

    const tx = await telegram.swap(100, { from: clientAccount });

    truffleAssert.eventEmitted(tx, "Swap", ev => {
      console.log("event", { ev });

      return ev.from == clientAccount && ev.amount == 100;
    });

    await checkBalances();

    assert.isTrue(false);
  });

  async function checkBalances() {
    const futuresContract = await telegramFutures.balanceOf.call(
      telegramFutures.address
    );
    const masterFutures = await telegramFutures.balanceOf.call(masterAccount);
    const clientFutures = await telegramFutures.balanceOf.call(clientAccount);

    const telegramContract = await telegram.balanceOf.call(telegram.address);
    const masterTelegram = await telegram.balanceOf.call(masterAccount);
    const clientTelegram = await telegram.balanceOf.call(clientAccount);
    console.log(
      "BALANCES",
      JSON.stringify(
        {
          futures: {
            contract: futuresContract.toString(),
            master: masterFutures.toString(),
            client: clientFutures.toString()
          },
          telegram: {
            contract: telegramContract.toString(),
            master: masterTelegram.toString(),
            client: clientTelegram.toString()
          }
        },
        undefined,
        2
      )
    );
  }
});
