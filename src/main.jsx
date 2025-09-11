import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const config = createConfig({
  chains: [mainnet, goerli],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
  autoConnect: true,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#10b981", // emerald-500
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "rounded",
            overlayBlur: "small",
          })}
          appInfo={{
            appName: "StakingdApp",
            learnMoreUrl: "https://docs.rainbowkit.com",
          }}
          modalSize="wide"
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  </StrictMode>
);