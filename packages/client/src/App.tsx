// import { useComponentValue } from "@latticexyz/react";
// import { useMUD } from "./MUDContext";
// import { singletonEntity } from "@latticexyz/store-sync/recs";

// export const App = () => {
//   const {
//     components: { Counter },
//     systemCalls: { increment },
//   } = useMUD();

//   const counter = useComponentValue(Counter, singletonEntity);

//   return (
//     <>
//       <div>
//         Counter: <span>{counter?.value ?? "??"}</span>
//       </div>
//       <button
//         type="button"
//         onClick={async (event) => {
//           event.preventDefault();
//           console.log("new counter value:", await increment());
//         }}
//       >
//         Increment
//       </button>
//     </>
//   );
// };

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export const App = () => {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "2762a57b-faa4-41ce-9f16-abff9300e2c9",
        walletConnectorExtensions: [EthersExtension],
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  );
};

export default App;
