import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: "pulsevault",
    projectId: "04726039ae0763114752c1726ee8064d",
    chains: [sepolia],
});