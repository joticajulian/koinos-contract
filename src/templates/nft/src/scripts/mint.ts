/**
 * Script to mint NFTs.
 * - The owner of the new NFTs will be the contract itself.
 * - The token ID is computed from the number of the NFT
 *
 * Before running this script update:
 * - TOTAL_NFTS: Total number of nfts in the collection
 * - WRITE_METADATA: Boolean defining if the metadata will be
 *     written in the blockchain or not. In case of yes, update
 *     the files in the metadata folder.
 */
import { Signer, Contract, Provider, Transaction } from "koilib";
import fs from "fs";
import * as dotenv from "dotenv";
import { TransactionJson, TransactionOptions } from "koilib/lib/interface";
import abi from "../build/___CONTRACT_CLASS___-abi.json";
import koinosConfig from "../koinos.config.js";

dotenv.config();

const TOTAL_NFTS = 150;
const WRITE_METADATA = true;
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
  if (process.env.USE_FREE_MANA === "true") {
    txOptions = {
      payer: network.accounts.freeManaSharer.id,
      rcLimit,
    };
  } else {
    const manaSharer = Signer.fromWif(
      network.accounts.manaSharer.privateKeyWif
    );
    manaSharer.provider = provider;
    txOptions = {
      payer: manaSharer.address,
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
  while (nextNFT < TOTAL_NFTS) {
    const tx = new Transaction({
      signer: contractAccount,
      provider,
      options: txOptions,
    });

    let i = nextNFT;
    while (i < nextNFT + NFTS_PER_TX && i <= TOTAL_NFTS) {
      const tokenId = `0x${Buffer.from(Number(i).toString()).toString("hex")}`;
      await tx.pushOperation(contract.functions.mint, {
        token_id: tokenId,
        to: contract.getId(),
      });

      if (WRITE_METADATA) {
        const metadata = fs.readFileSync(`metadata/${i}.json`, "utf8");
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
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
