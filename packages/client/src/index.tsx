import 'regenerator-runtime/runtime'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'

import './index.scss'
import './PhaserGame'
import muiTheme from './MuiTheme'
import App from './App'
import store from './stores'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DynamicContextProvider
        settings={{
          // Find your environment id at https://app.dynamic.xyz/dashboard/developer
          environmentId: '2762a57b-faa4-41ce-9f16-abff9300e2c9',
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <div style={{
          position: 'fixed',
          top: 15,
          right: 15,
        }}>
          <DynamicWidget />
        </div>

        <ThemeProvider theme={muiTheme}>
          <App />
        </ThemeProvider>
      </DynamicContextProvider>
    </Provider>
  </React.StrictMode>
)
