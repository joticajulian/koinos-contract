/**
 * Script to mint NFTs.
 * - The owner of the new NFTs will be the contract itself.
 * - The token ID is computed from the number of the NFT
 */
import {
  Signer,
  Contract,
  Provider,
  Transaction,
  TransactionJson,
  TransactionOptions,
} from "koilib";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import abi from "../src/build/___CONTRACT_ABI_FILE___";
import koinosConfig from "../src/koinos.config.js";

dotenv.config();

if (!process.env.TOTAL_NFTS)
  throw new Error(`The env var TOTAL_NFTS is not defined`);
if (!["true", "false"].includes(process.env.USE_FREE_MANA))
  throw new Error(`The env var USE_FREE_MANA must be true or false`);

const useFreeMana = process.env.USE_FREE_MANA === "true";
const totalNfts = Number(process.env.TOTAL_NFTS);
const NFTS_PER_TX = 10;

const [inputNetworkName] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  const provider = new Provider(network.rpcNodes);

  if (!network.accounts.contract.privateKeyWif) {
    throw new Error(
      `no private key defined for the contract in ${networkName}`,
    );
  }
  const contractAccount = Signer.fromWif(
    network.accounts.contract.privateKeyWif,
  );
  contractAccount.provider = provider;

  const contract = new Contract({
    signer: contractAccount,
    provider,
    abi,
  });

  const rcLimit = "2000000000";
  let txOptions: TransactionOptions;
  if (useFreeMana) {
    txOptions = {
      payer: network.accounts.freeManaSharer.id,
      payee: contract.getId(),
      rcLimit,
    };
  } else {
    if (!network.accounts.manaSharer.privateKeyWif) {
      throw new Error(
        `no private key defined for the manaSharer in ${networkName}`,
      );
    }
    const manaSharer = Signer.fromWif(
      network.accounts.manaSharer.privateKeyWif,
    );
    manaSharer.provider = provider;
    txOptions = {
      payer: manaSharer.address,
      payee: contract.getId(),
      rcLimit,
      beforeSend: async (tx: TransactionJson) => {
        await manaSharer.signTransaction(tx);
      },
    };
  }

  let nextNFT = 1;
  while (nextNFT < totalNfts) {
    const tx = new Transaction({
      signer: contractAccount,
      provider,
      options: txOptions,
    });

    let i = nextNFT;
    while (i < nextNFT + NFTS_PER_TX && i <= totalNfts) {
      const tokenId = `0x${Buffer.from(Number(i).toString()).toString("hex")}`;
      const metadata = fs.readFileSync(
        path.join(__dirname, `metadata/${i}.json`),
        "utf8",
      );
      await tx.pushOperation(contract.functions.set_metadata, {
        token_id: tokenId,
        metadata: JSON.stringify(metadata),
      });
      i += 1;
    }

    const receipt = await tx.send();
    console.log(`Transaction submitted: from ${nextNFT} to ${i - 1}`);
    console.log(
      `consumption: ${(Number(receipt.rc_used) / 1e8).toFixed(2)} mana`,
    );
    const { blockNumber } = await tx.wait();
    console.log(`mined in block ${blockNumber} (${networkName})`);
    nextNFT = i;
  }

  console.log(
    `NFT metadata set for contract ${contractAccount.address} (${networkName})`,
  );
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
