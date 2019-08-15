import React, { useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";

import futuresContractJson from "./contracts/TelegramFuturesToken.json";
import targetContractJson from "./contracts/TelegramToken.json";
import swapContractJson from "./contracts/TokenSwap.json";
import "./App.css";

const options = {
  gasPrice: 20,
  gas: 2000000
};
const networkId = "1337";

function ContractProvider({ web3, account, children }) {
  const [contracts, setContracts] = useState([]);

  const futuresContract = useMemo(() => {
    const { abi, networks } = futuresContractJson;
    const { address } = networks[networkId];
    return new web3.eth.Contract(abi, address, { ...options, account });
  }, [web3, account]);

  const targetContract = useMemo(() => {
    const { abi, networks } = targetContractJson;
    const { address } = networks[networkId];
    return new web3.eth.Contract(abi, address, { ...options, account });
  }, [web3, account]);

  const swapContract = useMemo(() => {
    const { abi, networks } = swapContractJson;
    const { address } = networks[networkId];
    return new web3.eth.Contract(abi, address, { ...options, account });
  }, [web3, account]);

  return children({ futuresContract, targetContract, swapContract });
}

export default ContractProvider;
