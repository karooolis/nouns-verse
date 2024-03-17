import "regenerator-runtime/runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import "./index.scss";
import "./PhaserGame";
import muiTheme from "./MuiTheme";
import App from "./App";
import store from "./stores";

import { setup } from "./mud/setup";
import { MUDProvider } from "./MUDContext";
import mudConfig from "contracts/mud.config";

const container = document.getElementById("root");
const root = createRoot(container!);

setup().then(async (result) => {
  root.render(
    <React.StrictMode>
      <MUDProvider value={result}>
        <Provider store={store}>
          <DynamicContextProvider
            settings={{
              // Find your environment id at https://app.dynamic.xyz/dashboard/developer
              environmentId: "3d48ee62-4255-4608-8de4-5707123b2b18",
              walletConnectors: [EthereumWalletConnectors],
            }}
          >
            {/* <div
              style={{
                position: "fixed",
                top: 15,
                right: 15,
              }}
            >
              <DynamicWidget />
            </div> */}

            <ThemeProvider theme={muiTheme}>
              <App />
            </ThemeProvider>
          </DynamicContextProvider>
        </Provider>
      </MUDProvider>
    </React.StrictMode>
  );
});
