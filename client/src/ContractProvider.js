import { useMemo } from "react";

import futuresContractJson from "./contracts/TelegramFuturesToken.json";
import targetContractJson from "./contracts/TelegramToken.json";
import "./App.css";

const options = {
  gasPrice: 20,
  gas: 2000000
};
const networkId = "1337";

function ContractProvider({ web3, account, children }) {
  web3.eth.defaultAccount = account;
  web3.eth.personal.unlockAccount(web3.eth.defaultAccount);

  const futuresContract = useMemo(() => {
    const { abi, networks } = futuresContractJson;
    const { address } = networks[networkId];
    return new web3.eth.Contract(abi, address, { ...options, from: account });
  }, [web3, account]);

  const targetContract = useMemo(() => {
    const { abi, networks } = targetContractJson;
    const { address } = networks[networkId];
    return new web3.eth.Contract(abi, address, { ...options, from: account });
  }, [web3, account]);

  return children({ futuresContract, targetContract });
}

export default ContractProvider;
