import React, { useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";

import "./App.css";

function SwapTool({
  web3,
  futuresContract,
  targetContract,
  swapContract,
  account
}) {
  const [futuresBalance, setFuturesBalance] = useState(0);
  const [targetBalance, setTargetBalance] = useState(0);
  const [swapReceipt, setSwapReceipt] = useState({});

  const handleSwap = useCallback(async () => {
    console.log(web3);
    const batch = web3.BatchRequest();
    console.log(batch);
    batch.add(
      futuresContract.methods.approve(futuresContract.address, 100).send()
    );
    batch.add(swapContract.methods.swap(100).send());
    const res = await batch.execute();
    console.log(res);

    // futuresContract.methods
    //   .burn(futuresBalance)
    //   .send()
    //   .on("transactionHash", function(hash) {
    //     console.log("hash", hash);
    //   })
    //   .on("confirmation", function(confirmationNumber, receipt) {
    //     console.log("confirmation", confirmationNumber, receipt);
    //   })
    //   .on("receipt", function(receipt) {
    //     console.log("receipt", receipt);
    //     setSwapReceipt(receipt);
    //   })
    //   .on("error", console.error);
  }, [futuresBalance, futuresContract.methods]);

  useEffect(() => {
    futuresContract.methods
      .balanceOf(account)
      .call()
      .then(setFuturesBalance);
    targetContract.methods
      .balanceOf(account)
      .call()
      .then(setTargetBalance);
  }, [swapReceipt, account, futuresContract.methods, targetContract.methods]);

  return (
    <div>
      <div>Your xGRAM balance is {futuresBalance}</div>
      <Button
        variant="outline-light"
        disabled={futuresBalance === 0}
        onClick={handleSwap}
      >
        Swap
      </Button>
      <div>Your TON balance is {targetBalance}</div>
    </div>
  );
}

export default SwapTool;
