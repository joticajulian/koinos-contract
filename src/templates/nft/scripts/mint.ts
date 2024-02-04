/**
 * Script to mint NFTs.
 * - The owner of the new NFTs will be the contract itself.
 * - The token ID is computed from the number of the NFT
 */
import { Signer, Contract, Provider, Transaction } from "koilib";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import { TransactionJson, TransactionOptions } from "koilib/lib/interface";
import abi from "../src/build/___CONTRACT_ABI_FILE___";
import koinosConfig from "../src/koinos.config.js";

dotenv.config();

if (!process.env.TOTAL_NFTS)
  throw new Error(`The env var TOTAL_NFTS is not defined`);
if (!["true", "false"].includes(process.env.WRITE_METADATA))
  throw new Error(`The env var WRITE_METADATA must be true or false`);
if (!["true", "false"].includes(process.env.USE_FREE_MANA))
  throw new Error(`The env var USE_FREE_MANA must be true or false`);

const useFreeMana = process.env.USE_FREE_MANA === "true";
const totalNfts = Number(process.env.TOTAL_NFTS);
const writeMetadata = process.env.WRITE_METADATA === "true";
const NFTS_PER_TX = 10;

const [inputNetworkName] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  const provider = new Provider(network.rpcNodes);

  const contractAccount = Signer.fromWif(
    network.accounts.contract.privateKeyWif
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
    const manaSharer = Signer.fromWif(
      network.accounts.manaSharer.privateKeyWif
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
  const { result: resultTotalSupply } = await contract.functions.total_supply();
  if (resultTotalSupply && resultTotalSupply.value) {
    nextNFT = Number(resultTotalSupply.value) + 1;
  }
  while (nextNFT < totalNfts) {
    const tx = new Transaction({
      signer: contractAccount,
      provider,
      options: txOptions,
    });

    let i = nextNFT;
    while (i < nextNFT + NFTS_PER_TX && i <= totalNfts) {
      const tokenId = `0x${Buffer.from(Number(i).toString()).toString("hex")}`;
      await tx.pushOperation(contract.functions.mint, {
        token_id: tokenId,
        to: contract.getId(),
      });

      if (writeMetadata) {
        const metadata = fs.readFileSync(
          path.join(__dirname, `metadata/${i}.json`),
          "utf8"
        );
        await tx.pushOperation(contract.functions.set_metadata, {
          token_id: tokenId,
          metadata: JSON.stringify(metadata),
        });
      }
      i += 1;
    }

    const receipt = await tx.send();
    console.log(`Transaction submitted: from ${nextNFT} to ${i - 1}`);
    console.log(
      `consumption: ${(Number(receipt.rc_used) / 1e8).toFixed(2)} mana`
    );
    const { blockNumber } = await tx.wait("byBlock", 60000);
    console.log(`mined in block ${blockNumber} (${networkName})`);
    nextNFT = i;
  }

  console.log(
    `NFTs minted for contract ${contractAccount.address} (${networkName})`
  );
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
