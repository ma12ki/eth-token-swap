import React, { useEffect, useState, useCallback } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import "./App.css";

function SwapTool({ web3, futuresContract, targetContract, account }) {
  const [futuresBalance, setFuturesBalance] = useState(0);
  const [targetBalance, setTargetBalance] = useState(0);
  const [swapAmount, setSwapAmount] = useState("");
  const [swapping, setSwapping] = useState(false);
  const [swapReceipt, setSwapReceipt] = useState({});

  const handleAll = useCallback(() => {
    setSwapAmount(futuresBalance);
  }, [futuresBalance]);
  const handleSwapAmountChange = useCallback(event => {
    setSwapAmount(event.target.value || "");
  }, []);

  const handleSwap = useCallback(async () => {
    // experimenting with batches - order of execution does not seem to be guaranteed :(
    // console.log(web3.eth, web3.eth.defaultAccount);
    // const batch = new web3.BatchRequest();
    // batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
    // batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}, callback2));
    // batch.execute();
    // console.log(batch);
    // batch.add(
    //   futuresContract.methods.approve(futuresContract.address, 100).send()
    // );
    // batch.add(targetContract.methods.swap(100).send());
    // batch.add(
    //   targetContract.methods
    //     .swap(100)
    //     .send.request({ from: account }, console.log)
    // );
    // batch.add(
    //   futuresContract.methods
    //     .approve(targetContract._address, 100)
    //     .send.request({ from: account }, console.log)
    // );
    // const res = await batch.execute();

    setSwapping(true);

    futuresContract.methods
      .approve(targetContract._address, swapAmount)
      .send()
      .on("transactionHash", function(hash) {
        console.log("hash", hash);
      })
      .on("confirmation", function(receipt) {
        console.log("confirmation", receipt);
      })
      .on("receipt", function(receipt) {
        console.log("receipt", receipt);
        executeSwap(receipt);
      })
      .on("error", handleError);

    function executeSwap() {
      targetContract.methods
        .swap(swapAmount)
        .send()
        .on("transactionHash", function(hash) {
          console.log("hash", hash);
        })
        .on("confirmation", function(receipt) {
          console.log("confirmation", receipt);
        })
        .on("receipt", function(receipt) {
          console.log("receipt", receipt);
          handleSuccess();
        })
        .on("error", handleError);
    }

    function handleSuccess(confirmationNumber, receipt) {
      console.log(confirmationNumber, receipt);
      setSwapping(false);
      setSwapReceipt(receipt);
    }

    function handleError(error) {
      console.error(error);
      setSwapping(false);
    }
  }, [
    futuresContract.methods,
    swapAmount,
    targetContract._address,
    targetContract.methods
  ]);

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
      <br />
      <InputGroup>
        <FormControl
          placeholder="Amount to swap"
          type="number"
          min="0"
          max={futuresBalance}
          value={swapAmount}
          disabled={swapping}
          onChange={handleSwapAmountChange}
        />
        <InputGroup.Append>
          <Button
            variant="outline-light"
            disabled={swapping}
            onClick={handleAll}
          >
            All
          </Button>
          <Button
            variant="outline-light"
            disabled={futuresBalance === 0 || swapping}
            onClick={handleSwap}
          >
            {swapping ? "Swapping..." : "Swap"}
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <br />
      <div>Your TON balance is {targetBalance}</div>
    </div>
  );
}

export default SwapTool;
