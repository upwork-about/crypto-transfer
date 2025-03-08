import "@rainbow-me/rainbowkit/styles.css";
import { mainnet, bscTestnet } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./App";
export const wagmiConfig = getDefaultConfig({
  appName: "App",
  projectId: "41c413c9b9ca023f3d4b24a2247605e6",
  // projectId: "21fef48091f12692cad574a6f7753643",
  chains: [mainnet, bscTestnet],
});

const queryClient = new QueryClient();
const Provider = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en" initialChain={1}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;
