import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useWeb3Context } from "web3-react";

import ContractProvider from "./ContractProvider";
import SwapTool from "./SwapTool";
import "./App.css";

function App() {
  const context = useWeb3Context();

  useEffect(() => {
    context.setConnector("Injected");
  }, [context]);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
      {context.active ? (
        <header className="App-header">
          <h2>Connected to account</h2>
          <div>{context.account}</div>
          <br />
          <ContractProvider web3={context.library} account={context.account}>
            {({ futuresContract, targetContract, swapContract }) => (
              <SwapTool
                web3={context.library}
                futuresContract={futuresContract}
                targetContract={targetContract}
                swapContract={swapContract}
                account={context.account}
              />
            )}
          </ContractProvider>
        </header>
      ) : (
        <Spinner animation="grow" />
      )}
    </div>
  );
}

export default App;
