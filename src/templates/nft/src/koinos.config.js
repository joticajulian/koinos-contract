const path = require("path");
const { HDKoinos } = require("@koinosbox/hdkoinos");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const hdKoinosMainnet = process.env.MAINNET_MNEMONIC
  ? new HDKoinos(process.env.MAINNET_MNEMONIC)
  : undefined;

const hdKoinosHarbinger = process.env.HARBINGER_MNEMONIC
  ? new HDKoinos(process.env.HARBINGER_MNEMONIC)
  : undefined;

function keysMainnet(index) {
  if (!hdKoinosMainnet) return { privateKeyWif: "", address: "" };
  return hdKoinosMainnet.deriveKeyAccount(index);
}

function keysHarbinger(index) {
  if (!hdKoinosHarbinger) return { privateKeyWif: "", address: "" };
  return hdKoinosHarbinger.deriveKeyAccount(index);
}

module.exports = {
  class: "___CONTRACT_CLASS___",
  proto: ["./proto/empty.proto"],
  files: ["./___CONTRACT_CLASS___.ts"],
  sourceDir: "./assembly",
  buildDir: "./build",
  filesImport: [
    {
      dependency: "@koinosbox/contracts",
      path: "../node_modules/@koinosbox/contracts/assembly/nft/Nft.ts",
    },
  ],
  protoImport: [
    {
      name: "@koinosbox/contracts",
      path: "../node_modules/@koinosbox/contracts/koinosbox-proto",
    },
    {
      name: "@koinos/sdk-as",
      path: "../node_modules/koinos-precompiler-as/koinos-proto/koinos",
    },
    {
      name: "__",
      path: "../node_modules/koinos-precompiler-as/koinos-proto/google",
    },
  ],
  networks: {
    harbinger: {
      rpcNodes: ["https://harbinger-api.koinos.io"],
      accounts: {
        manaSharer: {
          privateKeyWif: process.env.HARBINGER_MANA_SHARER_PRIVATE_KEY,
        },
        contract: keysHarbinger(process.env.HARBINGER_NFT),
      },
    },
    mainnet: {
      rpcNodes: ["https://api.koinos.io"],
      accounts: {
        manaSharer: {
          privateKeyWif: process.env.MAINNET_MANA_SHARER_PRIVATE_KEY,
        },
        contract: keysMainnet(process.env.MAINNET_NFT),
      },
    },
  },
};
