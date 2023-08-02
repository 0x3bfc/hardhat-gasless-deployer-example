import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gasless-deployer";
import { ethers } from "ethers";
import {JsonRpcProvider} from "@ethersproject/providers";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      evmVersion: "london",
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {},
    gsn: {
      url: "http://127.0.0.1:8545",
      accounts: [
        `YOUR_PRIVATE_KEY`,
      ],
      chainId: 1337
    },
    goerli: {
      url: `https://goerli.infura.io/v3/`,
      accounts: [
        `YOUR_PRIVATE_KEY`,
      ],
    },
  },
  hHGaslessDeployer: {
    contract:"Lock",
    initArgsPath: "./scripts/lockArgs.ts",
    salt: "", // Optional
    value: 0, // Optiional
    network: "gsn", // ie. local gsn network
    rpcUrl:  new ethers.JsonRpcProvider("http://127.0.0.1:8545") as unknown as JsonRpcProvider,
    paymaster: "0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb",
    relayerHub: "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550",
    forwarder: "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B",
  },
};

export default config;
