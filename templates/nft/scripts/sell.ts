/**
 * Script to list the NFTs in a market place.
 * This script assumes that the owner of the NFTs is the
 * contract itself.
 */
import { Signer, Contract, Provider, Transaction, utils } from "koilib";
import * as dotenv from "dotenv";
import { TransactionJson, TransactionOptions } from "koilib/lib/interface";
import abi from "../src/build/___CONTRACT_ABI_FILE___";
import abiMarketPlace from "./abi-market.json";
import koinosConfig from "../src/koinos.config.js";

dotenv.config();

if (!process.env.TOTAL_NFTS)
  throw new Error(`The env var TOTAL_NFTS is not defined`);
if (!process.env.PRICE) throw new Error(`The env var PRICE is not defined`);
if (!["true", "false"].includes(process.env.USE_FREE_MANA))
  throw new Error(`The env var USE_FREE_MANA must be true or false`);

const useFreeMana = process.env.USE_FREE_MANA === "true";
const totalNfts = Number(process.env.TOTAL_NFTS);
const price = process.env.PRICE; // KOIN
const NFTS_PER_TX = 10;
const KOIN_CONTRACT_ID = "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL";

const marketPlaces = [
  {
    name: "kollection",
    id: "16tsFkc5RyuwQmXxVABzHHwS513Nu2B9S3",
  },
  {
    name: "koinos-raffles",
    id: "1AyXgogBeFG9XSJjpSBFujNcfXbo8cbrKE",
  },
];

const [inputNetworkName, inputMarketPlace] = process.argv.slice(2);

async function main() {
  const networkName = inputNetworkName || "harbinger";
  const network = koinosConfig.networks[networkName];
  if (!network) throw new Error(`network ${networkName} not found`);
  if (networkName !== "mainnet")
    throw new Error(`this script is not prepared for ${networkName}`);
  const marketPlace = marketPlaces.find((m) => m.name === inputMarketPlace);
  if (!marketPlace)
    throw new Error(
      `invalid marketplace. It should be ${marketPlaces
        .map((m) => m.name)
        .join(" or ")}. Received '${inputMarketPlace}'`,
    );
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

  const marketContract = new Contract({
    id: marketPlace.id,
    provider,
    abi: abiMarketPlace,
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

      const { result } = await contract.functions.owner_of({
        token_id: tokenId,
      });

      if (result && result.value !== contract.getId()) {
        console.log(`skipping ${i}. Owner: ${result.value}`);
        continue;
      }

      const { result: resultOrder } = await marketContract.functions.get_order({
        collection: contract.getId(),
        token_id: tokenId,
      });

      if (resultOrder) continue;

      await tx.pushOperation(contract.functions.approve, {
        token_id: tokenId,
        approver_address: contract.getId(),
        to: marketContract.getId(),
      });

      await tx.pushOperation(marketContract.functions.create_order, {
        collection: contract.getId(),
        token_sell: KOIN_CONTRACT_ID,
        token_id: tokenId,
        token_price: utils.parseUnits(price, 8),
        time_expire: "0",
      });

      i += 1;
    }

    if (tx.transaction.operations.length > 0) {
      const receipt = await tx.send();
      console.log(`Transaction submitted: from ${nextNFT} to ${i - 1}`);
      console.log(
        `consumption: ${(Number(receipt.rc_used) / 1e8).toFixed(2)} mana`,
      );
      const { blockNumber } = await tx.wait("byBlock", 60000);
      console.log(`mined in block ${blockNumber} (${networkName})`);
    }
    nextNFT = i;
  }

  console.log(
    `Sell orders placed for collection ${contractAccount.address} (${networkName})`,
  );
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
